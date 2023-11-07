package com.example.security.domain.notice.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateNotice {
    private String subject;
    private String content;
}
