package com.project.back.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.TicketEntity;

public interface TicketRepository extends JpaRepository<TicketEntity, Long>{
   
}
