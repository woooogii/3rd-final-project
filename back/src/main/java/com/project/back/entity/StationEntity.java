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
    @Column(name = "sId")
    private Long sId;//대여소 id

    @Column(name = "STA_LOC")
    private String sta_loc;//대여소 번호

    @Column(name = "RENT_ID")
    private String rent_id;//대여소 이름

    @Column(name = "RENT_NO")
    private String rent_no;//자치구(서초구 등)
    
    @Column(name = "RENT_ID_NM")
    private String rent_id_nm;//자치구(서초구 등)

    @Column(name = "RENT_NM")
    private String rent_nm;//상세주소

    @Column(name = "HOLD_NUM")
    private String hold_num;//경도

    @Column(name = "STA_ADD1")
    private String sta_add1;//대여 가능 수

    @Column(name = "STA_LAT")
    private String sta_lat;//대여 가능 수

    @Column(name = "STA_LONG")
    private String sta_long;//대여 가능 수

    @Column(name = "START_INDEX")
    private String start_index;//대여 가능 

    public StationEntity(){
    }


}