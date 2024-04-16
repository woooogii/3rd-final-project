package com.project.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

//Bean 등록하고 관리 , 그러면 controller에서 가져다 쓸 수 있음
@Configuration
public class AppConfig { 

     @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
