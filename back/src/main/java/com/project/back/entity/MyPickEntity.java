package com.project.back.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

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

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "u_id")
    private UserEntity user;

    @OneToOne
    @JoinColumn(name="p_id")
    private ProductEntity product;

}

