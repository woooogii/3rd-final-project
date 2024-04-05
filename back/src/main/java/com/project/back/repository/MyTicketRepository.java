package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.MyTicketEntity;

public interface MyTicketRepository extends JpaRepository<MyTicketEntity,Long>{
    
}
