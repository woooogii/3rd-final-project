package com.project.back.entity;

import java.time.LocalDate;
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

    @ManyToOne
    @JoinColumn(name = "u_id")
    private UserEntity user;

    @Column(name = "o_buydate")
    private LocalDate oBuyDate;

    //하나의 order이 많은 OrderDetail을 가짐 > OrderDetailEntity을 매핑. 매핑한 애는 order
    //주문번호 삭제 시 상세 주문도 함께 삭제
    @OneToMany(mappedBy = "orders",cascade = CascadeType.REMOVE)
    private List<OrderDetailEntity> orderDetail;
}
