DROP TABLE IF EXISTS `study`.notice;
CREATE TABLE `study`.notice
(
    id            BIGINT       NOT NULL PRIMARY KEY,
    created_by    BIGINT       NOT NULL COMMENT '작성자',
    modified_by   BIGINT       NULL COMMENT '수정자',
    created_date  DATETIME     NOT NULL COMMENT '등록일자',
    modified_date DATETIME     NOT NULL COMMENT '수정일자',
    subject       VARCHAR(255) NOT NULL COMMENT '제목',
    content       LONGTEXT     NOT NULL COMMENT '내용',
    CONSTRAINT FK_NOTICE_ON_CREATED_BY FOREIGN KEY (created_by) references user (id),
    CONSTRAINT FK_NOTICE_ON_MODIFIED_BY FOREIGN KEY (modified_by) references user (id)
) ENGINE = InnoDB COMMENT '공지사항';