package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity,Long>{
    
}
