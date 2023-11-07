package com.example.security.domain.account.service;

import com.example.security.domain.account.dto.SignInRequest;
import com.example.security.domain.account.dto.SignInResponse;
import com.example.security.domain.account.dto.SignUpRequest;
import com.example.security.domain.account.entity.Account;
import com.example.security.domain.account.repository.AccountRepository;
import com.example.security.global.config.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AccountRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signUp(SignUpRequest request) {
        // 단방향 암호화
        String password = passwordEncoder.encode(request.getPassword());

        Account user = Account.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(password)
                .roles("ROLE_USER")
                .build();
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public SignInResponse signIn(SignInRequest request) {
        Account user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다."));
        String encPassword = user.getPassword();
        boolean matches = passwordEncoder.matches(request.getPassword(), encPassword);
        if (!matches) {
            throw new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다.");
        }

        String token = jwtProvider.createToken(user.getEmail(), user.getAuthorities());

        List<String> roles = Arrays.stream(user.getRoles().split(",")).toList();

        return SignInResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(roles)
                .build();

    }

}
