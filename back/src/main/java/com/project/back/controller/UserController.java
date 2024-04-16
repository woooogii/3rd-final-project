package com.project.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.UserDTO;
import com.project.back.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }


    //회원가입 요청
    @PostMapping("pedal/join")
    public Boolean joinProcess(@RequestBody UserDTO userDTO) {
        
        System.out.println(userDTO.getUId());
        System.out.println(userDTO.getUPwd());
        userService.joinProcess(userDTO);

        return true;
    }
    


}
