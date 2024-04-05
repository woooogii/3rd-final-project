package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "station")
@Getter
@Setter
public class StationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    private Long sId;//대여소 번호

    @Column(name = "s_name",nullable = false)
    private String sName;//대여소 이름

    @Column(name = "s_addr",nullable = false)
    private String sAddr;//자치구(서초구 등)

    @Column(name = "s_addrdetail",nullable = true)
    private String sAddrdetail;//상세주소

    @Column(name = "s_latitude",nullable = false)
    private String sLatitude;//위도

    @Column(name = "s_longitude",nullable = false)
    private String sLongitude;//경도

    @Column(name = "s_byciclenum",nullable = false)
    private Long sByciclenum;//대여 가능 수
}