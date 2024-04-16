package com.project.back.controller.testControllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@ResponseBody
public class TestMainCon {
    
    @GetMapping("/")
    public String mainP() {
        return "Main Contorller";
    }
    
}
