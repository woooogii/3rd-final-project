package com.project.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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


    //리뷰수 저장 + 카운트
    @GetMapping("/reviewCount/{pId}")
    public ResponseEntity<Integer> getReviewCount(@PathVariable Long pId)  {
        
        int count = reviewService.getReviewCount(pId);

        return ResponseEntity.ok(count);
    }
    
    @DeleteMapping("/deleteReview/{rId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long rId) {
        try {
            reviewService.deleteReview(rId);
            return ResponseEntity.ok("Review deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete review: " + e.getMessage());
        }
    }
}

