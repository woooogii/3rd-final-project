package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "myPick")
@Getter
@Setter
public class MyPickEntity {
    
    @Id
    @Column(name = "mp_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mpId;

   
    @Column(name = "u_id")
    private String user;
    //찜한 사람 아이디, User참조
  
    @Column(name="p_id")
    private Long product;
    //찜 당한 물품, Product 참조

}

