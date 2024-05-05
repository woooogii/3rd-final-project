package com.project.back.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.back.dto.LikesDTO;
import com.project.back.entity.StationEntity;
import com.project.back.entity.StationLikeEntity;
import com.project.back.service.StationLikeService;
import com.project.back.service.StationService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/pedal")
public class StationLikeController {
    
    @Autowired
    @Qualifier("StationLikeService")
    private StationLikeService stationLikeService;
    @Autowired
    private StationService stationService;
    
    //즐겨찾기 추가
    @PostMapping("/station/addStationLikes")
    public ResponseEntity<?> addStationLikes(@RequestBody Map<String, String> stationLikeEntity) {
        try {
            String user = stationLikeEntity.get("user");
            String stationId = stationLikeEntity.get("stationId");
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
            String stationId =stationLikeEntity.get("stationId");
            stationLikeService.deleteStationLikes(user,stationId);
            return ResponseEntity.ok("Station like deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    //즐겨찾기 조회
    @GetMapping("/station/getStationLikes/{uid}")    
    public ResponseEntity<List<StationLikeEntity>> getStationLikes(@PathVariable("uid") String user){
        try {
            List<StationLikeEntity> likesData = stationLikeService.findByuId(user);
            return ResponseEntity.ok(likesData);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //즐겨찾기 목록
    @GetMapping("/station/getLikesData/{uid}")    
    public ResponseEntity<List<LikesDTO>> getLikesLists(@PathVariable("uid") String user){
    List<LikesDTO> stationData = new ArrayList<>();
    try {
        List<StationLikeEntity> likesData = stationLikeService.findByuId(user);
        for(StationLikeEntity data : likesData){
            String rentId = data.getStationId();
            System.out.println("컨트롤러"+rentId);
            List<StationEntity> stations = stationService.findByStationId(rentId);
            for (StationEntity station : stations) {
                LikesDTO likesDTO = new LikesDTO();
                likesDTO.setUser(user);
                likesDTO.setHoldNum(station.getHold_num());
                likesDTO.setRentId(station.getRent_id());
                likesDTO.setRentIdNm(station.getRent_id_nm());
                likesDTO.setRentNm(station.getRent_nm());
                likesDTO.setRentNo(station.getRent_no());
                likesDTO.setStaAddr(station.getSta_add1());
                likesDTO.setStaLat(station.getSta_lat());
                likesDTO.setStaLoc(station.getSta_loc());
                likesDTO.setStaLong(station.getSta_long());
                stationData.add(likesDTO);
            }
        }
        return ResponseEntity.ok(stationData);
    } catch (Exception e) {
        System.out.println(e.toString());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    
}
