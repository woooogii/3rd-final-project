package com.project.back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.back.entity.ProductEntity;
import com.project.back.entity.StationLikeEntity;
import com.project.back.service.StationLikeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/pedal")
public class StationLikeController {
    
    @Autowired
    @Qualifier("StationLikeService")
    private StationLikeService stationLikeService;
    
    //즐겨찾기 추가
    @PostMapping("/station/addStationLikes")
    public ResponseEntity<?> addStationLikes(@RequestBody Map<String, String> stationLikeEntity) {
        try {
            String user = stationLikeEntity.get("user");
            Long stationId = Long.parseLong(stationLikeEntity.get("stationId").toString());
            stationLikeService.addStationLikes(user,stationId);
            return ResponseEntity.ok("Station like added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    //즐겨찾기 삭제
    @PostMapping("/station/deleteStationLikes")
    public ResponseEntity<?> deleteStationLikes(@RequestBody Map<String, String> stationLikeEntity) {
        try {
            String user = stationLikeEntity.get("user");
            Long stationId = Long.parseLong(stationLikeEntity.get("stationId").toString());
            stationLikeService.deleteStationLikes(user,stationId);
            return ResponseEntity.ok("Station like deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    //즐겨찾기 목록
    @GetMapping("/station/likesData/{uid}")    
    public ResponseEntity<List<StationLikeEntity>> getLikeData(@PathVariable("uid") String user){
        try {
            List<StationLikeEntity> likesData = stationLikeService.findByuId(user);
            return ResponseEntity.ok(likesData);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
    
}
