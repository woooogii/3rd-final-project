package com.project.back.entity;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "cart")
@Getter
@Setter
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_id")
    private Long cId;

    @OneToOne//하나의 user id를 참조
    @JoinColumn(name = "u_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "p_id")//하나의 product id를 참조
    private ProductEntity product;

    @Column(name = "c_amount",nullable = false)
    private Long cAmount;
}

