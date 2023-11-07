package com.example.security.domain.notice.service;

import com.example.security.domain.account.entity.Account;
import com.example.security.domain.notice.dto.CreateNotice;
import com.example.security.domain.notice.dto.NoticeDetailResponse;
import com.example.security.domain.notice.dto.NoticeListResponse;
import com.example.security.domain.notice.dto.UpdateNotice;
import com.example.security.domain.notice.entity.Notice;
import com.example.security.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional(readOnly = true)
    public List<NoticeListResponse> searchList() {
        List<Notice> list = noticeRepository.findAll();

        return list.stream()
                .map(notice -> NoticeListResponse.builder()
                        .id(notice.getId())
                        .writerName(notice.getCreatedBy().getName())
                        .createdDate(notice.getCreatedDate())
                        .subject(notice.getSubject())
                        .content(notice.getContent())
                        .build()
                )
                .toList();
    }

    @Transactional
    public NoticeDetailResponse noticeDetail(Long id) {

        Notice notice = getNotice(id);

        String updaterName = notice.getModifiedBy() != null ? notice.getModifiedBy().getName() : "";
        LocalDateTime modifiedDate = notice.getModifiedDate() != null ? notice.getModifiedDate() : notice.getCreatedDate();

            return NoticeDetailResponse.builder()
                .id(notice.getId())
                .writerName(notice.getCreatedBy().getName())
                .updaterName(updaterName)
                .createdDate(notice.getCreatedDate())
                .modifiedDate(modifiedDate)
                .subject(notice.getSubject())
                .content(notice.getContent())
                .build();
    }

    @Transactional
    public Long createNotice(CreateNotice request) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Notice entity = Notice.builder()
                .createdBy(account)
                .createdDate(LocalDateTime.now())
                .subject(request.getSubject())
                .content(request.getContent())
                .build();
        return noticeRepository.save(entity).getId();
    }

    @Transactional
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }


    @Transactional
    public Long updateNotice(Long id, UpdateNotice request) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Notice notice = getNotice(id);
        notice.update(account, request);
        return notice.getId();
    }

    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("데이터가 존재하지 않습니다."));
    }

}
