package com.project.back.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "product")
@Getter
@Setter
public class ProductEntity {
    
    @Id
    @Column(name = "p_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pId; //상품번호(자동부여 PK)

    @Column(name = "p_category")
    private String pCategory; //상품 카테고리(자전거,용품 등)

    @Column(name = "p_name")
    private String pName;

    @Column(name = "p_price")
    private Long pPrice;

    @Column(name = "p_saveFileName")
    private String pSaveFileName;

    @Column(name = "p_originalFileName")
    private String pOriginalFileName;

    @Column(name = "p_description")
    private String pDescription;

    @Column(name = "p_regdate")
    private LocalDate pRegDate;

}

