package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.back.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity,Long>{
    
}
