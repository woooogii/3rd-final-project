package com.project.back.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.entity.ProductEntity;
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

    public List<StationEntity> searchData(String keyword){
        try {
            System.out.println("service"+keyword);
            List<StationEntity> result = stationRepository.findStationByRentNmContaining(keyword);
            System.out.println("service"+result);
            if (result.isEmpty()) {
                return Collections.emptyList(); // 빈 리스트 반환
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("데이터 불러오기 오류: " + e.getMessage());
        }
    }

    public List<StationEntity> findByStationId(String stationId){
        try {
            List<StationEntity> stations = stationRepository.findByRentId(stationId);
            if(stations.isEmpty()) {
                throw new RuntimeException("데이터 불러오기 오류: 해당하는 엔티티가 없습니다.");
            }
            return stations;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("데이터 불러오기 오류: " + e.getMessage());
        }
    }
}
