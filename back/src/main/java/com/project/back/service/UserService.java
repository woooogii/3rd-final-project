package com.project.back.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.back.config.oauth.SocialEntity;
import com.project.back.config.oauth.SocialRepository;
import com.project.back.dto.SocialDTO;
import com.project.back.dto.UserDTO;
import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    SocialRepository socialRepository;

    private final PasswordEncoder passwordEncoder;


    public void joinProcess(UserDTO userDTO){

        String uId = userDTO.getUId();
        String uPwd = userDTO.getUPwd();

        Boolean isExist = userRepository.existsByuId(uId);
    
        if(isExist){
            //DB에 유저정보가 검색이 되어 true를 받으면
            //아래 코드 실행 안함. 
            return;
        }
        
        UserEntity userEntity = new UserEntity();
        userEntity.setUId(uId);
        userEntity.setUPwd(passwordEncoder.encode(uPwd));
        userEntity.setUName(userDTO.getUName());
        userEntity.setUPhone(userDTO.getUPhone());
        userEntity.setUAddress(userDTO.getUAddress());
        userEntity.setUAddrDetail(userDTO.getUaddrdetail());
        userEntity.setUSaveFileName(userDTO.getUSaveFileName());
        userEntity.setUOriginalFileName(userDTO.getUOriginalFileName());
    
        userRepository.save(userEntity);
    }
    
    public UserEntity callUserInfo(String uId){
        return userRepository.findByuId(uId);
    }

    public UserEntity updateUserInfo(String uId, UserDTO userDTO) {
        // 데이터베이스에서 사용자를 찾습니다.
        UserEntity user = userRepository.findByuId(uId);

        user.setUId(userDTO.getUId());
        user.setUName(userDTO.getUName());
        user.setUPhone(userDTO.getUPhone());
        user.setUAddress(userDTO.getUAddress());
        user.setUAddrDetail(userDTO.getUaddrdetail());

        // 변경된 사용자 정보를 데이터베이스에 저장합니다.
        return userRepository.save(user);
    }

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }


    public SocialEntity callSocialInfo(String email){
        return socialRepository.findByEmail(email);
    }

    public SocialEntity updateSocialInfo(String email, SocialDTO socialDTO) {
        // 데이터베이스에서 사용자를 찾습니다.
        SocialEntity social = socialRepository.findByEmail(email);

        social.setEmail(socialDTO.getEmail());
        social.setPhone(socialDTO.getPhone());
        social.setAddress(socialDTO.getAddress());
        social.setAddrDetail(socialDTO.getAddrDetail());

        // 변경된 사용자 정보를 데이터베이스에 저장합니다.
        return socialRepository.save(social);
    }

}


