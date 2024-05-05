package com.project.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.project.back.dto.LikesDTO;
import com.project.back.entity.CartEntity;
import com.project.back.entity.StationEntity;
import com.project.back.entity.StationLikeEntity;
import com.project.back.repository.StationLikeRepository;
import com.project.back.repository.StationRepository;

@Service("StationLikeService")
public class StationLikeService {
    
    @Autowired
    @Qualifier("StationLikeRepository")
    private StationLikeRepository stationLikeRepository;

    @Autowired
    private StationRepository stationRepository;


    //즐겨찾기 추가
    public void addStationLikes(String user, String stationId){
        StationLikeEntity stationLike = stationLikeRepository.findByUserAndStationId(user, stationId);
        if(stationLike!=null){
            return;
        }else{
            StationLikeEntity stationLikeEntity = new StationLikeEntity();
            stationLikeEntity.setUser(user);
            stationLikeEntity.setStationId(stationId);
            stationLikeRepository.save(stationLikeEntity);
        }
    }
    
    //즐겨찾기 삭제
    public void deleteStationLikes(String user, String stationId){  
        StationLikeEntity stationLike = stationLikeRepository.findByUserAndStationId(user, stationId); 
        try {
            System.out.println("서비스 시작"+stationId);
            stationLikeRepository.deleteById(stationLike.getLikeId());
            System.out.println("서비스 종료"+stationId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete station likes", e);
        }
    }

    //즐겨찾기 조회
    public List<StationLikeEntity> findByuId(String user){
        List<StationLikeEntity> likesData = stationLikeRepository.findByUser(user);
        return likesData;
    }


    
}
