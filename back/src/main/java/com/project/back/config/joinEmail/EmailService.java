package com.project.back.config.joinEmail;

import org.springframework.http.ResponseEntity;

public interface EmailService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestsDto dto);
    ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestsDto dto);
}
