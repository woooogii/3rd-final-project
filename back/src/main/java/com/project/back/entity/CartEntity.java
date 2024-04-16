package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "cart")
@Getter
@Setter
@NoArgsConstructor
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_id")
    private Long cId;

    @Column(name = "u_id")
    private String user;
    //카트 쓰는 유저 id, User참조

    @Column(name = "p_id")
    private Long productId;
    //카트에 담은 물품, Product참조

    @Column(name = "c_amount",nullable = false)
    private Long cAmount;


}

