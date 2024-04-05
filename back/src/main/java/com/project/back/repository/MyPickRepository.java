package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.MyPickEntity;

public interface MyPickRepository extends JpaRepository<MyPickEntity,Long>{
    
}
