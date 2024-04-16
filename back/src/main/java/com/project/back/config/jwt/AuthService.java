package com.project.back.config.jwt;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final SecurityUserDetailService userDetailService;
    private final PasswordEncoder passwordEncoder;


    public ResponseEntity<String> login(Map<String, String> user, HttpServletResponse response) {

        UserDetails userDetails = userDetailService.loadUserByUsername(user.get("uid"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, user.get("upwd"),
        userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("=====================" + user.get("uid"));
    
        UserEntity userEntity = userRepository.findByuId(user.get("uid"))
        .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디입니다."));

        if(!passwordEncoder.matches(user.get("upwd"),userEntity.getUPwd())){
            throw new IllegalArgumentException("이메일 또는 비밀번호가 맞지 않습니다.");
        }

        String jwtToken = jwtTokenProvider.createToken(userEntity.getUId(), userEntity.getUName(), userEntity.getUIdRole());

        
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);
        cookie.setSecure(true);
        response.addCookie(cookie);
        
        return ResponseEntity.ok(jwtToken);
    }



    public ResponseEntity<String> logout(HttpServletResponse response) {
                System.out.println("쿠키삭제시작");
                // 쿠키 삭제
                Cookie cookie = new Cookie("jwtToken", null);
                cookie.setMaxAge(0);
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath("/");
                response.addCookie(cookie);


                System.out.println("쿠키삭제완료");
                return ResponseEntity.ok("로그아웃되었습니다.");
    
    }



}
