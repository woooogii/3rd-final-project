package com.project.back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

import java.lang.String;

@Configuration
@Getter
@Setter
public class MyConfig {
  
    @Value("${api.key}")
    private String apiKey;

    @Value("${api.secret}")
    private String apiSecret;

}
