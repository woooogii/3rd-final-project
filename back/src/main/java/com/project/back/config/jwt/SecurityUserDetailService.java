package com.project.back.config.jwt;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

@Service
public class SecurityUserDetailService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String uId) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByuId(uId);
        if (user == null) {
            throw new UsernameNotFoundException(uId + " 사용자 없음");
        } else {
            return new SecurityUser(user);
        }

    
    }
}
