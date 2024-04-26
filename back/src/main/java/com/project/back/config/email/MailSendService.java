package com.project.back.config.email;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailSendService {
    
     // 이메일에 난수를 포함한 링크를 보내주는 서비스

     private final JavaMailSender mailSender;
     private final CertificationGenerator generator;
 
     private final UserRepository userRepository;
     private final PasswordEncoder passwordEncoder; // 스프링 시큐리티
 
     public void sendEmailForCertification(String uid)
             throws NoSuchAlgorithmException, MessagingException {
 
         // 비밀번호 생성
         String certificationNumber = generator.createCertificationNumber();
 
        
         String link = "<a href='http://localhost:3000/pedal/login'>페달의민족 로그인</a>";
 
         String content = String.format("%s <br> 임시비밀번호: %s <br><br> %s <br> 로그인 후 마이페이지에서 비밀번호를 수정해주세요.",
                 certificationNumber,
                 link);
 
         // 비밀번호 해싱
         String userPw = passwordEncoder.encode(certificationNumber);
 
         // DB에 비밀번호 저장
         Optional<UserEntity> optionalUser = userRepository.findById(uid);
         if (optionalUser.isPresent()) {
             UserEntity user = optionalUser.get();
             user.setUPwd(userPw); // 비밀번호 설정
             userRepository.save(user); // 변경된 비밀번호를 DB 저장
         }
 
         // 이메일 전송
         sendMail(uid, content);
     }
 
     private void sendMail(String email, String content) throws MessagingException {
 
         // 이메일 객체 생성
         MimeMessage mimeMessage = mailSender.createMimeMessage();
         MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
 
         // 수신자, 제목, 내용 설정
         helper.setTo(email);
         helper.setSubject("[페달의민족] 비밀번호 변경 메일");
         helper.setText(content, true); // html변환 전달
 
         // 메일 전송
         mailSender.send(mimeMessage);
     }

}
