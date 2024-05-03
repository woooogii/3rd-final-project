package com.project.back.config.webMvcConfig;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration  
public class WebMvcConfig implements WebMvcConfigurer { 

       private final Environment environment;

    public WebMvcConfig(Environment environment) {
        this.environment = environment;
    }

    @Override  
    public void addResourceHandlers(ResourceHandlerRegistry registry) {  
        String PATH = environment.getProperty("file.upload.path");
        String absolutePath = new File(PATH).getAbsolutePath();
        
        registry.addResourceHandler("/images/**") 
                .addResourceLocations("file://" + absolutePath + "/"); // 절대 경로로 변경
    }


    // @Override  
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {  
    //     registry.addResourceHandler("/images/**") 
    //     .addResourceLocations("file:///Users/gimjieun/Desktop/final-project-pedal/back/src/main/resources/static/images/"); // 정적 리소스가 위치한 디렉토리 경로
    // }
}
