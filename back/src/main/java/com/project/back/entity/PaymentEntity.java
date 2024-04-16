package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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

}
