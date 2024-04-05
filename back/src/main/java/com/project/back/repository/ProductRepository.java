package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity,Long>{
    
}
