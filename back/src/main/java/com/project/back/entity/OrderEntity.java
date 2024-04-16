package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "orders")
@Getter
@Setter
public class OrderEntity {

     

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "o_id")
    private Long oId;

    /* 

    @Column(name = "u_id")
    private String user;
    //User참조, 구매자 id

    @Column(name = "o_buydate")
    private LocalDate oBuyDate;

    //하나의 order이 많은 OrderDetail을 가짐 > OrderDetailEntity을 매핑. 매핑한 애는 order
    //주문번호 삭제 시 상세 주문도 함께 삭제
    @Column(name = "od_id")
    private List<OrderDetailEntity> orderDetail;

    */
}
