package com.project.back.entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

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


    @Column(name = "p_description")
    private String pDescription;

    @Column(name = "p_regdate")
    private LocalDate pRegDate;

    @Column(name = "p_image1")
    private String pImage1;

    @Column(name = "p_image2")
    private String pImage2;

    @Column(name = "p_image3")
    private String pImage3;

   @Column(name = "p_image4")
    private String pImage4;

    @ElementCollection(fetch = FetchType.EAGER)//항상 함께 업로드
    @Column(name = "p_image_urls")
    private List<String> pImageUrls; // 이미지 파일 경로 리스트

}

