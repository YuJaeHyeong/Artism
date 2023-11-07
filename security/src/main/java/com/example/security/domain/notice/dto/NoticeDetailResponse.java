package com.example.security.domain.notice.dto;

import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailResponse {

    private Long id;
    private String writerName;
    private String updaterName;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String subject;
    private String content;
}
