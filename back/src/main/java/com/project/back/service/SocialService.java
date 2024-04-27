package com.project.back.service;

import org.springframework.stereotype.Service;

import com.project.back.config.oauth.SocialEntity;
import com.project.back.config.oauth.SocialRepository;
import com.project.back.dto.SocialDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialService {
    
    
    private final SocialRepository socialRepository;

    public SocialEntity callSocialInfo(String email){
        return socialRepository.findByEmail(email);
    }

    public SocialEntity updateSocialUser(String email, SocialDTO socialDTO) {
        SocialEntity social = socialRepository.findByEmail(email);
        if (social == null) {
            throw new RuntimeException("No social information found for the given email: " + email);
        }
    
        social.setEmail(socialDTO.getEmail());
        social.setPhone(socialDTO.getPhone());
        social.setAddress(socialDTO.getAddress());
        social.setAddrDetail(socialDTO.getAddrDetail());
    
        return socialRepository.save(social);
    }
}
