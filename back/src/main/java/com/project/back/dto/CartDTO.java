package com.project.back.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CartDTO { //장바구니에 필요한 정보만 담아서 보내려고 만든 DTO 
    
    private Long pId; //상품번호(자동부여 PK)

    private String pName;

    private Long pPrice;

    private String pDescription;

    private String pImage1;

    private String pImage2;

    private String pImage3;

    private String pImage4;

    private List<String> pImageUrls; //이미지파일 경로

    private Long cAmount; 


}
