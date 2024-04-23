package com.project.back.config.oauth;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class OauthMainContorller {

        @GetMapping("/google")
        public String authMainPage(@RequestParam String param) {
          
            return "main";
        }
        

}
