package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;
import com.project.back.entity.StationEntity;


@Repository("StationRepository")
public interface StationRepository extends JpaRepository<StationEntity, Long> {
    @Query("SELECT s FROM station s WHERE s.rent_id_nm LIKE %:keyword%")
    List<StationEntity> findStationByRentNmContaining(String keyword);
}

