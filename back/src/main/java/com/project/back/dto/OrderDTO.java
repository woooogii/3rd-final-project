package com.project.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
    



  //3. DTO하나 파서 , 1.상품이미지(p) , 2.상품명(p), 3.가격(p), 4.수량(o), 5. 구매일(o)
  private String pImage;
  private String pName;
  private Long pPrice;
  private Long amount;
  private String orderDate;

}
