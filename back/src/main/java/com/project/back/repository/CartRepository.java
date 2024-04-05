package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity,Long>{
    
}
