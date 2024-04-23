package com.project.back.config.oauth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class GoogleSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oauth2User = (CustomOAuth2User) ((OAuth2AuthenticationToken) authentication).getPrincipal();

        // JWT 토큰 생성
        String token = jwtTokenUtil.generateToken(oauth2User);

        // JWT 토큰을 쿠키에 설정
        Cookie cookie = new Cookie("googleJwtToken", token);
        cookie.setSecure(true); // HTTPS에서만 전송
        cookie.setPath("/");
        cookie.setMaxAge(3600); // 토큰 만료 시간 설정 (예: 1시간)
        response.addCookie(cookie);
        
        // 리다이렉트할 URI 설정 (React 애플리케이션의 홈페이지로 리다이렉트)
        response.sendRedirect("http://localhost:3000");
    }
}