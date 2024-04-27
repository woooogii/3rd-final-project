package com.project.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
    



  
  private String pImage;
  private String pName;
  private Long pPrice;
  private Long amount;
  private String orderDate;
  private Long oNum; // 이건 리액트에서 key값으로 쓰려고 
}
