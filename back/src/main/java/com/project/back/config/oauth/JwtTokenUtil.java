package com.project.back.config.oauth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

@Component
public class JwtTokenUtil {

    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(CustomOAuth2User oauth2User) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", oauth2User.getName());
        claims.put("email", oauth2User.getEmail());
        claims.put("iat", new Date());
        claims.put("exp", new Date(System.currentTimeMillis() + expiration * 1000));

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }
}