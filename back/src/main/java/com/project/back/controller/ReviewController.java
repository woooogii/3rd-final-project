package com.project.back.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.entity.ReviewEntity;
import com.project.back.service.ReviewService;

@RestController
@RequestMapping("/pedal")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // 리뷰 저장
    @PostMapping("/review")
    public ResponseEntity<ReviewEntity> saveReview(@RequestBody ReviewEntity reviewEntity) {
        reviewService.saveReview(reviewEntity);
        return ResponseEntity.ok(reviewEntity);
    }

    // 모든 리뷰 조회
    @GetMapping("/reviewAll")
    public List<ReviewEntity> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // 특정 상품에 대한 리뷰 조회
    @GetMapping("/review/{pId}")
    public List<ReviewEntity> getReviewById(@PathVariable Long pId) {
        return reviewService.findBypId(pId);
    }

  
}