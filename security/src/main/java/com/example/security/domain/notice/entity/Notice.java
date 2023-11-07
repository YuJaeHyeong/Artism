package com.example.security.domain.notice.entity;

import com.example.security.domain.account.entity.Account;
import com.example.security.domain.notice.dto.UpdateNotice;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)//필요할때만 호출 jpa n+1 읽어보기
    @JoinColumn(name = "created_by",updatable = false)
    private Account createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modified_by")
    private Account modifiedBy;

    @Column(updatable = false)
    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private String subject;

    private String content;

    public void update(Account modifiedBy, UpdateNotice request){
        this.modifiedBy = modifiedBy;
        this.modifiedDate = LocalDateTime.now();
        this.subject = request.getSubject();
        this.content = request.getContent();
    }

}
