package com.project.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.project.back.entity.PaymentEntity;
import com.project.back.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    //DB에 저장
    public void savePaymentEntity(PaymentEntity paymentEntity){
        paymentRepository.save(paymentEntity);
    }

    //전체 리스트 출력
    public List<PaymentEntity> getAllPaymentEntities(){
        return paymentRepository.findAll();
    }

    //상품명으로 구분하기
    public PaymentEntity findBymerchantUid(String merchantUid) {
        return paymentRepository.findByMerchantUid(merchantUid);
    }
}
