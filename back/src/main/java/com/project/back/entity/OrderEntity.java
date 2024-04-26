package com.project.back.entity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "orders")
@Getter
@Setter
public class OrderEntity {

     

    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long oNum;


    @Column(name = "o_id")
    private String oId;

    @Column(name = "u_id")
    private String uid;

    @Column(name = "o_buydate")
    private String oBuyDate;

    // 상품 ID
    @Column(name = "product_id")
    private Integer productId;

    // 상품 수량
    @Column(name = "amount")
    private Integer amount;
}
