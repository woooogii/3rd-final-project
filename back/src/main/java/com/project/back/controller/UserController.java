package com.project.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.back.config.oauth.SocialEntity;
import com.project.back.dto.SocialDTO;
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
public ResponseEntity<UserDTO> callUserInfo(@PathVariable String uId) {
    UserEntity userEntity = userService.callUserInfo(uId);
    if (userEntity == null) {
        return ResponseEntity.notFound().build();
    }

    UserDTO userDTO = new UserDTO();
    userDTO.setUId(userEntity.getUId());
    userDTO.setUName(userEntity.getUName());
    userDTO.setUPhone(userEntity.getUPhone());
    userDTO.setUAddress(userEntity.getUAddress());
    userDTO.setUaddrdetail(userEntity.getUAddrDetail());
    userDTO.setUSaveFileName(userEntity.getUSaveFileName());
    userDTO.setUOriginalFileName(userEntity.getUOriginalFileName());
    userDTO.setUIdRole(userEntity.getUIdRole());
    // 비밀번호와 같은 민감한 정보는 DTO에 설정하지 않습니다.

    return ResponseEntity.ok(userDTO);
}

@PutMapping("/pedal/{uId}")
public ResponseEntity<UserDTO> updateUser(@PathVariable String uId, @RequestBody UserDTO userDTO) {
    UserEntity updatedUserEntity = userService.updateUserInfo(uId, userDTO);
    if (updatedUserEntity == null) {
        return ResponseEntity.notFound().build();
    }

    UserDTO updatedUserDTO = new UserDTO();
    updatedUserDTO.setUId(updatedUserEntity.getUId());
    updatedUserDTO.setUName(updatedUserEntity.getUName());
    updatedUserDTO.setUPhone(updatedUserEntity.getUPhone());
    updatedUserDTO.setUAddress(updatedUserEntity.getUAddress());
    updatedUserDTO.setUaddrdetail(updatedUserEntity.getUAddrDetail());
    updatedUserDTO.setUSaveFileName(updatedUserEntity.getUSaveFileName());
    updatedUserDTO.setUOriginalFileName(updatedUserEntity.getUOriginalFileName());
    updatedUserDTO.setUIdRole(updatedUserEntity.getUIdRole());
    // 비밀번호는 DTO에 포함하지 않습니다.

    return ResponseEntity.ok(updatedUserDTO);
}

    @PostMapping("/pedal/check-password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody UserPasswordDTO userPasswordDTO) {
    UserEntity user = userService.callUserInfo(userPasswordDTO.getUid());
    if (user != null && userService.getPasswordEncoder().matches(userPasswordDTO.getUpwd(), user.getUPwd())) {
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

@GetMapping("/pedal/google/{email}")
        public ResponseEntity<SocialDTO> callsocialInfo(@PathVariable String email) {
            SocialEntity socialEntity = userService.callSocialInfo(email);
            if (socialEntity == null) {
                return ResponseEntity.notFound().build();
            }
        
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setEmail(socialEntity.getEmail());     
            socialDTO.setPhone(socialEntity.getPhone());
            socialDTO.setAddress(socialEntity.getAddress());
            socialDTO.setAddrDetail(socialEntity.getAddrDetail());
       
            // 비밀번호와 같은 민감한 정보는 DTO에 설정하지 않습니다.
        
            return ResponseEntity.ok(socialDTO);
        }
        
        @PutMapping("/pedal/google/{email}")
        public ResponseEntity<SocialDTO> updateUser(@PathVariable String email, @RequestBody SocialDTO socialDTO) {
            SocialEntity updatedSocialEntity = userService.updateSocialInfo(email, socialDTO);
            if (updatedSocialEntity == null) {
                return ResponseEntity.notFound().build();
            }
        
            SocialDTO updatedSocialDTO = new SocialDTO();
           
            updatedSocialEntity.setEmail(updatedSocialEntity.getEmail());
            updatedSocialEntity.setPhone(updatedSocialEntity.getPhone());
            updatedSocialEntity.setAddress(updatedSocialEntity.getAddress());
            updatedSocialEntity.setAddrDetail(updatedSocialEntity.getAddrDetail());
        
            return ResponseEntity.ok(updatedSocialDTO);
        }










}
    


