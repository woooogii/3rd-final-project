package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "my_ticket")
@Getter
@Setter
public class MyTicketEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="mt_id")
    private Long mtId; //구매번호

    @Column(name = "mt_merchant_uid")
    private String mtMerchantUid; //상품번호

    @Column(name = "mt_name")
    private String mtName; //상품명

    @Column(name = "mt_amount")
    private int mtAmount; //상품수량

    @Column(name = "mt_pay_time ")
    private String mtPayTime ; //구매시간

    @Column(name="mt_start_time")
    private String mtStartTime ; //사용시작시간 

    @Column(name="mt_end_time")
    private String mtEndTime ; //반납시간 
    
    @Column(name="my_status")
    private boolean myStatus; //이용여부

    @Column(name = "u_id", nullable = false)
    private String uid;
    //User 참조, 사용자 id

    @Column(name = "u_name", nullable = false)
    private String uname;
    //User 참조, 사용자 이름

}
