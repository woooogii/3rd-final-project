package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


import lombok.Getter;
import lombok.Setter;

@Entity(name = "payment")
@Getter
@Setter
public class PaymentEntity {

    @Id
    @Column(name = "p_merchant_uid")
    private String merchantUid;

    @Column(name = "p_pg") 
    private String pg;

    @Column(name = "p_pay_method")
    private String payMethod;

    @Column(name = "p_name")
    private String name;

    @Column(name = "p_amount")
    private int amount;

    @Column(name="p_pay_time")
    private String payTime; 

    @Column(name = "u_id", nullable = false)
    private String uid;
    //User 참조, 사용자 id

    @Column(name = "u_name", nullable = false)
    private String uname;
    //User 참조, 사용자 이름

}
