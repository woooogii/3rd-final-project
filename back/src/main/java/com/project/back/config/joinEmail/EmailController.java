package com.project.back.config.joinEmail;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
public class EmailController {
    
    private final EmailService emailService;

    @PostMapping("/pedal/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(@RequestBody IdCheckRequestDto requestBody) {
       
        ResponseEntity<? super IdCheckResponseDto> response = emailService.idCheck(requestBody);

        return response;
    }
    

    @PostMapping("/pedal/email-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(
        @RequestBody EmailCertificationRequestsDto requestBody
        ){ 
            ResponseEntity<? super EmailCertificationResponseDto> response = emailService.emailCertification(requestBody);

            return response;

    } 


    @PostMapping("pedal/check-certification")
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertfication(
        @RequestBody CheckCertificationRequestsDto requestBody
    ) {

        ResponseEntity<? super CheckCertificationResponseDto> response = emailService.checkCertification(requestBody);
        return response;
    }
}



