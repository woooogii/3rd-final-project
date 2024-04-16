package com.project.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.back.config.jwt.AuthService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequiredArgsConstructor
@RestController
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("pedal/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> user, HttpServletResponse response) {
 

        return authService.login(user,response);
    }

    @DeleteMapping("pedal/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        System.out.println("로그아웃요청받음");
        return authService.logout(response);
    }
}
    

