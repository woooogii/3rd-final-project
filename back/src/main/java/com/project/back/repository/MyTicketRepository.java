package com.project.back.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.back.entity.MyTicketEntity;

public interface MyTicketRepository extends JpaRepository<MyTicketEntity,Long>{

    MyTicketEntity findByMtMerchantUid(String mtMerchantUid);
    List<MyTicketEntity> findByMyStatus(boolean myStatus);
    List<MyTicketEntity> findByUid(String uid);

}
