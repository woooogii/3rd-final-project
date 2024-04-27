package com.project.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.OrderEntity;


public interface OrderRepository extends JpaRepository<OrderEntity,Long>{
    

    List<OrderEntity> findAllByUid(String uid);
}
