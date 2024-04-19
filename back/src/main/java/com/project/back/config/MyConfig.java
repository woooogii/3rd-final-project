package com.project.back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import lombok.Getter;
import lombok.Setter;

import java.lang.String;

//엔드포인트, api키 등을 관리
@Configuration
@Getter
@Setter
public class MyConfig {
  
    @Value("${api.key}")
    private String apiKey;

    @Value("${api.secret}")
    private String apiSecret;

    //결제컨트롤러 주소 
    @Value("${payment.controller.url}")
    private String paymentControllerUrl;

}
