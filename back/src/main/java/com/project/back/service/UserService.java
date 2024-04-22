package com.project.back.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.back.dto.UserDTO;
import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    @Autowired
    UserRepository userRepository;

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
        userEntity.setUAddrDetail(userDTO.getUAddrDetail());
        userEntity.setUSaveFileName(userDTO.getUSaveFileName());
        userEntity.setUOriginalFileName(userDTO.getUOriginalFileName());
    
        userRepository.save(userEntity);
    }
    

}
