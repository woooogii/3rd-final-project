package com.project.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.config.oauth.SocialEntity;
import com.project.back.config.oauth.SocialRepository;
import com.project.back.dto.SocialDTO;
import com.project.back.service.SocialService;

@RestController
public class SocialController {
    
    private SocialRepository socialRepository;
    private final SocialService socialService;

    public SocialController(SocialService socialService){
        this.socialService = socialService;
    }
    

    @GetMapping("/pedal/google2")
    public ResponseEntity<SocialDTO> callsocialInfo(@RequestParam String email) {
        
        SocialEntity socialEntity = socialService.callSocialInfo(email);
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
        
        @PutMapping("/pedal/googleupdate")
        public ResponseEntity<SocialDTO> updateSocialUser(@RequestBody SocialDTO socialDTO) {
            System.out.println(socialDTO.getEmail() + " / " + socialDTO.getAddress() + " ----------------------------");
            SocialEntity social = socialService.updateSocialUser(socialDTO.getEmail(), socialDTO);
            if (social == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(socialDTO);
        }

}
