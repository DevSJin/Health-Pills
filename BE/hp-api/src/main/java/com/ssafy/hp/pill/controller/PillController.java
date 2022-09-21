package com.ssafy.hp.pill.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.hp.config.LoginUser;
import com.ssafy.hp.pill.request.PillReviewRequest;
import com.ssafy.hp.pill.request.SearchRequest;
import com.ssafy.hp.pill.response.PillDetailResponse;
import com.ssafy.hp.pill.response.PillListResponse;
import com.ssafy.hp.pill.response.PillReviewListResponse;
import com.ssafy.hp.pill.service.PillServiceImpl;
import com.ssafy.hp.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

@RequestMapping("/api/pills")
@RestController
@RequiredArgsConstructor
public class PillController {

    private final PillServiceImpl pillService;

    // 영양제 검색
    @GetMapping("/search")
    public ResponseEntity<Page<PillListResponse>> search(@PageableDefault Pageable page, @Valid SearchRequest request) {

        Page<PillListResponse> body = pillService.findBySearchFilter(request, page);

        return ResponseEntity.ok().body(body);
    }

    // 영양제 디테일 조회
    @GetMapping("/{pill_id}")
    public ResponseEntity<PillDetailResponse> findOne(@PathVariable int pill_id) {
        PillDetailResponse body = pillService.findByPillId(pill_id);
        return ResponseEntity.ok().body(body);
    }

    // 리뷰 작성
    @PostMapping("/{pill_id}/review")
    public ResponseEntity<Void> createReview(@LoginUser User user, @PathVariable int pill_id, @RequestBody @Valid PillReviewRequest request) {
        pillService.createReview(user, pill_id, request);
        return ResponseEntity.ok().build();
    }
    
    // 리뷰 목록 조회
    @GetMapping("/{pill_id}/review")
    public ResponseEntity<Page<PillReviewListResponse>> getReviewList(@PageableDefault Pageable page, @PathVariable int pill_id) {
        Page<PillReviewListResponse> body = pillService.getReviews(pill_id, page);
        return ResponseEntity.ok().body(body);
    }

    // 리뷰 수정
    @PutMapping("/review/{review_id}")
    public ResponseEntity<Void> updateReview(@LoginUser User user, @PathVariable int review_id, @RequestBody @Valid PillReviewRequest request) {
        pillService.updateReview(user, review_id, request);
        return ResponseEntity.ok().build();
    }

    // 리뷰 삭제
    @DeleteMapping("/review/{review_id}")
    public ResponseEntity<Void> deleteReview(@LoginUser User user, @PathVariable int review_id) {
        pillService.deleteReview(user, review_id);
        return ResponseEntity.ok().build();
    }



}
