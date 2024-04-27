package com.project.back.config.joinEmail;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;
    private final EmailProvider emailProvider;

    @Override
    public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {
        
        try {

            String userId = dto.getEmail();
            boolean isExistId = userRepository.existsByuId(userId);
            if (isExistId) return IdCheckResponseDto.duplicated();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return IdCheckResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestsDto dto) {
        try {

            String userId = dto.getEmail();

            boolean isExistId = userRepository.existsById(userId);

            if(isExistId) return EmailCertificationResponseDto.duplicateId();

            String certificationNumber = CertificationNumber.getCertificationNumber();
          
            boolean isSuccessed = emailProvider.sendCertificationMail(userId, certificationNumber);
            if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

            CertificationEntity certificationEntity = new CertificationEntity(userId, certificationNumber);
            certificationRepository.save(certificationEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestsDto dto) {
        try {

            String userId = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            CertificationEntity certificationEntity = certificationRepository.findByEmail(userId);
            if (certificationEntity == null) return CheckCertificationResponseDto.certificationFail();

            boolean isMatched = certificationEntity.getEmail().equals(userId) && certificationEntity.getCertificationNumber().equals(certificationNumber);

            if(!isMatched) return CheckCertificationResponseDto.certificationFail();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CheckCertificationResponseDto.success();
    }
    
}
