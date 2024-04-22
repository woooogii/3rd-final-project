package com.project.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.project.back.entity.ReviewEntity;
import com.project.back.repository.ReviewRepository;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;

     //DB저장
    public void saveReview(ReviewEntity reviewEntity){
        reviewRepository.save(reviewEntity);
    }

    //전체리스트 출력 
    public List<ReviewEntity> getAllReviews(){
        return reviewRepository.findAll();
    }


    //id찾기
    public ReviewEntity getReviewById(Long pId) {
        return reviewRepository.findById(pId)
                .orElseThrow(() -> new RuntimeException("리뷰한 아이디를 찾지 못했음: " + pId));
    }

}
