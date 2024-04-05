package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.StationEntity;



public interface StationRepository extends JpaRepository<StationEntity, Long>{
    
}
