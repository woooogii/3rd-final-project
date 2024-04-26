package com.project.back.config.email;

import org.springframework.web.bind.annotation.RestController;

import com.project.back.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class EmailController {
    
    @Autowired
    UserService userService;



    @PostMapping("/pedal/find-password")
    public ResponseEntity<String> findPwd(@RequestBody Map<String, String> user) {
        
        System.out.println(user.get("uid"));
        System.out.println(user.get("utel"));

        return userService.findPwdByUser(user);
    }
    
}
