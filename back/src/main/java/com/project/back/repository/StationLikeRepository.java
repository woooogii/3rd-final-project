package com.project.back.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back.entity.StationLikeEntity;

@Repository("StationLikeRepository")
public interface StationLikeRepository extends JpaRepository<StationLikeEntity,Long>{
    StationLikeEntity findByUserAndStationId(String user, String stationId);
    List<StationLikeEntity> findByUser(String user);
    void deleteByUserAndStationId(String user,String stationId);
}
