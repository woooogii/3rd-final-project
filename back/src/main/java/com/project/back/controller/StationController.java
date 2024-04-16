package com.project.back.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.entity.StationEntity;
import com.project.back.service.StationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
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

    @GetMapping("/pedal/station")
    public List<StationEntity> getData(StationEntity stationEntity) {
        return stationService.getData();
    }
    
}
