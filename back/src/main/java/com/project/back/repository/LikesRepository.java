package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.LikesEntity;

public interface LikesRepository extends JpaRepository<LikesEntity,Long>{
    
}
