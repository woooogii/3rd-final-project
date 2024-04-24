package com.project.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.UserDTO;
import com.project.back.dto.UserPasswordDTO;
import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;
import com.project.back.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserController {
    
    private final UserService userService;
    private UserRepository userRepository;

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
    
    //마이페이지 유저 정보 불러오기 (수정 시 필요)
    @GetMapping("/pedal/{uId}")
    public ResponseEntity<UserEntity> callUserInfo(@PathVariable String uId) {
        
        UserEntity user = userService.callUserInfo(uId);  // 인스턴스를 통한 메소드 호출
       
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    
    }

    @PutMapping("/pedal/{uId}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable String uId, @RequestBody UserDTO userDTO) {
        
        UserEntity updatedUser = userService.updateUserInfo(uId, userDTO);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/pedal/check-password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody UserPasswordDTO userPasswordDTO) {
    UserEntity user = userService.callUserInfo(userPasswordDTO.getUId());
    if (user != null && userService.getPasswordEncoder().matches(userPasswordDTO.getUPwd(), user.getUPwd())) {
        return ResponseEntity.ok(true);
    }
    return ResponseEntity.ok(false);
}

@PutMapping("/pedal/update-password")
public ResponseEntity<?> updatePassword(@RequestBody UserPasswordDTO userPasswordDTO) {
    try {
        UserEntity user = userService.callUserInfo(userPasswordDTO.getUid());
        if (user != null) {
            System.out.println(user);
            user.setUPwd(userService.getPasswordEncoder().encode(userPasswordDTO.getUpwd()));
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}

}
    


