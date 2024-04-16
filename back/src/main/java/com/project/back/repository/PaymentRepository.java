package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.back.entity.PaymentEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
    PaymentEntity findByMerchantUid(String merchantUid);
}
