package com.example.security.domain.notice;

import com.example.security.domain.notice.dto.CreateNotice;
import com.example.security.domain.notice.dto.NoticeDetailResponse;
import com.example.security.domain.notice.dto.NoticeListResponse;
import com.example.security.domain.notice.dto.UpdateNotice;
import com.example.security.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<List<NoticeListResponse>> searchList() {
        return ResponseEntity.ok(noticeService.searchList());
    }

    @PostMapping("/management")
    public ResponseEntity<Long> createNotice(@RequestBody CreateNotice request) {
        return ResponseEntity.ok(noticeService.createNotice(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDetailResponse> detailView(@PathVariable("id") Long id) {
        NoticeDetailResponse response = noticeService.noticeDetail(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/management/{id}")
    public ResponseEntity<Boolean> deleteNotice(@PathVariable("id") Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/management/{id}")
    public ResponseEntity<Long> updateNotice(@PathVariable("id") Long id, @RequestBody UpdateNotice request) {
        return ResponseEntity.ok(noticeService.updateNotice(id, request));
    }
}
