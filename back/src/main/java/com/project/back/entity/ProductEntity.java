package com.project.back.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "product")
@Setter
@Getter
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
    private LocalDateTime pRegDate = LocalDateTime.now();;

    @Column(name = "p_image1")
    private String pImage1;

    @Column(name = "p_image2")
    private String pImage2;

    @Column(name = "p_image3")
    private String pImage3;

   @Column(name = "p_image4")
    private String pImage4;

    @Column(name = "u_id")
    private String uId;
    // User 참조, 댓글 쓴 user_id

    // 이미지 파일 넣기
    public void setProductImages(List<String> imageUrls) {
        if (imageUrls.size() >= 1) {
            this.pImage1 = imageUrls.get(0);
        }
        if (imageUrls.size() >= 2) {
            this.pImage2 = imageUrls.get(1);
        }
        if (imageUrls.size() >= 3) {
            this.pImage3 = imageUrls.get(2);
        }
        if (imageUrls.size() >= 4) {
            this.pImage4 = imageUrls.get(3);
        }
    }

}

