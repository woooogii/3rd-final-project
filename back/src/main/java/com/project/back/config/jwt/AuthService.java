package com.project.back.config.jwt;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        System.out.println("로그인 요청 온 아이디: "+ user.get("uid"));
        // 사용자 정보로 UserDetails 로드
        UserDetails userDetails = userDetailService.loadUserByUsername(user.get("uid"));
        
        // 인증 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, user.get("upwd"), userDetails.getAuthorities());
        // SecurityContext에 인증 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // 사용자 아이디로 사용자 조회
        UserEntity userEntity = userRepository.findByuId(user.get("uid"));
        
        // 사용자가 존재하지 않는 경우
            if (userEntity == null || userEntity.equals(null)) {
                System.out.println("아디없어");
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        // 비밀번호 일치 여부 확인
        if (!passwordEncoder.matches(user.get("upwd"), userEntity.getUPwd())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 맞지 않습니다.");
        }
        
        // JWT 토큰 생성
        String jwtToken = jwtTokenProvider.createToken(userEntity.getUId(), userEntity.getUName(), userEntity.getUIdRole());
        // JWT 토큰을 쿠키에 설정0
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);
        cookie.setSecure(true);
        response.addCookie(cookie);
        // 로그인 성공 시 JWT 토큰 반환
        return ResponseEntity.ok(jwtToken);
    }



    public ResponseEntity<String> logout(HttpServletResponse response) {
                System.out.println("쿠키삭제시작");
                // 쿠키 삭제
                Cookie cookie = new Cookie("jwtToken", null);
                cookie.setMaxAge(0);
                cookie.setSecure(true);
                cookie.setPath("/");
                response.addCookie(cookie);


                System.out.println("쿠키삭제완료");
                return ResponseEntity.ok("로그아웃되었습니다.");
    
    }

        public ResponseEntity<String> googleLogout(HttpServletResponse response) {
            System.out.println("구글쿠키삭제시작");
            // 쿠키 삭제
            Cookie cookie = new Cookie("googleJwtToken", null);
            cookie.setMaxAge(0);
            cookie.setSecure(true);
            cookie.setPath("/");
            response.addCookie(cookie);


            System.out.println("구글쿠키삭제완료");
            return ResponseEntity.ok("구글 로그아웃 되었습니다.");

    }



}
