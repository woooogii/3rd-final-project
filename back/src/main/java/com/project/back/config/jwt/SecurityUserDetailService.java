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

        Optional<UserEntity> optional = userRepository.findById(uId);
        if(!optional.isPresent()){
            throw new UsernameNotFoundException(uId + " 사용자 없음");
        } else {
            UserEntity user = optional.get();
            return new SecurityUser(user);
        }
    }

    
}
