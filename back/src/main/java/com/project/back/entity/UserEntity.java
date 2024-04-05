package com.project.back.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "user")
@Getter
@Setter
public class UserEntity {
    @Id
    @Column(name="u_id", nullable = false, length = 50)
    private String uId; 
    
    @Column(name="u_pwd", nullable = false, length = 50)
    private String uPwd; 

    @Column(name="u_name",nullable = false, length = 50)
    private String uName; 

    //닉네임 5글자 이내
    @Column(name="u_nickname",nullable = false, length = 15) 
    private String uNickname; 

    @Column(name="u_tel",nullable = false, length = 50)
    private String uTel; 

    @Column(name="u_phone",nullable = false, length = 20)
    private String uPhone; 

    @Column(name="u_email",nullable = false, unique = true, length = 50)
    private String uEmail; 
    
    @Column(name="u_address",nullable = false, length = 100)
    private String uAddress; 

    @Column(name="u_addr_detail",length = 70)
    private String uAddrDetail; 

    @Column(name="u_saveFileName")
    private String uSaveFileName; 

    @Column(name="u_originalFileName")
    private String uOriginalFileName; 
    
    @Column(name="u_id_code",length = 20)
    private String uIdCode;
}
