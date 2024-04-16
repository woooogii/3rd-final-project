package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.project.back.config.MyConfig;
import com.project.back.entity.PaymentEntity;
import com.project.back.service.PaymentService;

import java.util.Map;

@RestController
@RequestMapping("/pedal")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    //외부 API와 통신할 수 있게 해주는 라이브러리 , Http 역할
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private MyConfig myConfig;

    // 결제 정보를 저장
    @PostMapping("/savePaymentInfo")
    public ResponseEntity<?> savePaymentEntity(@RequestBody Map<String, Object> paymentInfo) {

        // PaymentEntity 객체 생성 및 값 설정
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setPg((String) paymentInfo.get("pg"));
        paymentEntity.setPayMethod((String) paymentInfo.get("pay_method"));
        paymentEntity.setMerchantUid((String) paymentInfo.get("merchant_uid"));
        paymentEntity.setName((String) paymentInfo.get("name"));
        paymentEntity.setAmount((int) paymentInfo.get("amount"));

        // PaymentEntity 저장
        paymentService.savePaymentEntity(paymentEntity);

        // 저장된 PaymentEntity 출력
        System.out.println("결제 정보 저장 완료: " + paymentEntity);
        System.out.println("------------------PaymentEntity 정보:");
        for (Map.Entry<String, Object> entry : paymentInfo.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        return ResponseEntity.ok(paymentEntity);
    }

    // IAMPORT API 토큰 요청하는 엔드포인트
    @PostMapping("/payments/getAccessToken")
    public ResponseEntity<?> getAccessToken() {
        try {
            // IAMPORT API 키와 시크릿 가져오기
            String impKey = myConfig.getApiKey();
            String impSecret = myConfig.getApiSecret();

            // IAMPORT API 토큰 요청 URL
            String url = "https://api.iamport.kr/users/getToken";

            // IAMPORT API에 전달할 데이터
            String requestData = "{imp_key: \"" + impKey + "\", \"imp_secret\": \"" + impSecret + "\"}";

            // IAMPORT API로 POST 요청하여 토큰 가져오기
            String response = restTemplate.postForObject(url, requestData, String.class);

            // 가져온 토큰 반환
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }
}
