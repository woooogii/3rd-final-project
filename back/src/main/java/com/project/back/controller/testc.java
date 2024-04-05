package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.project.back.entity.Test;
import com.project.back.service.Tests;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
public class testc {
    @Autowired
    private Tests service;

    @PostMapping("/pedal/test")
    public void saveEntity(@RequestBody Test entity) {
        System.out.println(entity);
        service.svaeTestEntity(entity);
    }
    
    @GetMapping("/pedal/test")
    public List<Test> showList() {
        return service.getAllTest();
    }
    
}
