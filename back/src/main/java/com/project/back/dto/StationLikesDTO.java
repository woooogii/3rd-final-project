package com.project.back.dto;

import lombok.Data;

@Data
public class StationLikesDTO {
    private String user;
    //대여소 정보
    private String staLoc;
    private String rentId;
    private String rentNo;
    private String rentIdNm;
    private String rentNm;
    private String holdNum;
    private String staAddr;
    private String staLat;
    private String staLong;
}

