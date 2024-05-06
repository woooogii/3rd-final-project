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

        // 파일 경로 구분자를 운영 체제에 맞게 사용
        String fileSeparator = File.separator;

        // 파일 경로를 URL로 변환
        absolutePath = absolutePath.replace(fileSeparator, "/");

        // 파일 프로토콜을 추가하여 절대 경로로 변환
        String fileProtocol = "file:///";
        if (!absolutePath.endsWith("/")) {
            absolutePath += "/";
        }

        registry.addResourceHandler("/images/**")
                .addResourceLocations(fileProtocol + absolutePath);
    }
}


