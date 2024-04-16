package com.project.back.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.entity.StationEntity;
import com.project.back.repository.StationRepository;

@Service
public class StationService {
    @Autowired
    private StationRepository stationRepository;

    public void saveData(List<StationEntity> stationData){
        if (stationData == null) {
            throw new IllegalArgumentException("stationEntity list cannot be null");
        }
        try {
            stationRepository.saveAll(stationData);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("데이터 저장 오류: " + e.getMessage());
        }
    }

    public List<StationEntity> getData(){
        try {
            return stationRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("데이터 불러오기 오류: " + e.getMessage());
        }
    }
}
