DROP TABLE IF EXISTS `study`.user;
CREATE TABLE `study`.user
(
    id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(10)  NOT NULL COMMENT '이름',
    email    VARCHAR(255) NOT NULL UNIQUE COMMENT '이메일',
    password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    roles    VARCHAR(20)  NOT NULL COMMENT '권한',
    KEY idx1_user (email)
) ENGINE = InnoDB COMMENT '유저';