package com.project.back.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.entity.StationEntity;
import com.project.back.service.StationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/pedal")
public class StationController {
    @Autowired
    private StationService stationService;

    @PostMapping("/insertData")
    public void saveData(@RequestBody List<StationEntity> stationData) {
        try {
            // ObjectMapper objectMapper = new ObjectMapper();
            // String jsonString = objectMapper.writeValueAsString(stationData);
            // System.out.println("요청된 JSON 데이터: " + jsonString);
            stationService.saveData(stationData);
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    @GetMapping("/station")
    public List<StationEntity> getData(StationEntity stationEntity) {
        return stationService.getData();
    }

    @PostMapping("/station/search")
    public ResponseEntity<List<StationEntity>> searchData(@RequestBody Map<String, String> requestData) {
        String keyword = requestData.get("keyword");
        System.out.println("컨트롤러"+keyword);
        if(keyword == null || keyword.isEmpty()) {
            // 클라이언트가 keyword 파라미터를 제대로 전달하지 않은 경우
            return ResponseEntity.badRequest().body(null);
        }
        try {
            List<StationEntity> result = stationService.searchData(keyword);
            // ObjectMapper objectMapper = new ObjectMapper();
            // String jsonString = objectMapper.writeValueAsString(result);
            // System.out.println("요청된 result 데이터: " + jsonString);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
}
