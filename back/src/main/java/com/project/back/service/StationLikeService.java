package com.project.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.project.back.entity.StationLikeEntity;
import com.project.back.repository.StationLikeRepository;

@Service("StationLikeService")
public class StationLikeService {
    
    @Autowired
    @Qualifier("StationLikeRepository")
    private StationLikeRepository stationLikeRepository;

    public List<StationLikeEntity> findByuId(String user){
        List<StationLikeEntity> likesData = stationLikeRepository.findByUser(user);
        return likesData;
    }

    public void addStationLikes(String user, Long stationId){
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

    public void deleteStationLikes(String user, Long stationId){  
        StationLikeEntity stationLike = stationLikeRepository.findByUserAndStationId(user, stationId); 
        try {
            System.out.println("서비스 시작"+stationId);
            stationLikeRepository.deleteById(stationLike.getLikeId());
            System.out.println("서비스 종료"+stationId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete station likes", e);
        }
    }


    
}
