package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "orderDetail")
@Getter
@Setter
public class OrderDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "od_id")
    private Long odId;
    
    @ManyToOne
    @JoinColumn(name = "o_id")//많은 OrderDetailEntity이 하나의 order id를 참조
    private OrderEntity orders;
    
    @OneToOne
    @JoinColumn(name = "p_id")
    private ProductEntity product;

    @Column(name = "od_amount",nullable = false)
    private Long odAmount;

    @Column(name = "od_price",nullable = false)
    private Long odPrice;
}

