package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "ticket")
@Getter
@Setter
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_id")
    private long tId; //티켓번호

    @Column(name = "t_name",nullable = false, length = 30)
    private String tName; 
    
    @Column(name = "t_category",nullable = false, length = 15)
    private String tCategory; // 시간권 / 정기권
    
    @Column(name = "t_price",nullable = false, length = 10)
    private long tPrice;

}

