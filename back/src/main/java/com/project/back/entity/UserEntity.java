package com.project.back.entity;


import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {
    @Id
    @Column(name="u_id", nullable = false, length = 50)
    private String uId; 
    //Email로 아이디 사용
    
    @Column(name="u_pwd", nullable = false)
    private String uPwd; 

    @Column(name="u_name",nullable = false, length = 50)
    private String uName; 

    @Column(name="u_phone",nullable = false, length = 20)
    private String uPhone; 

    @Column(name="u_address",nullable = false, length = 100)
    private String uAddress; 

    @Column(name="u_addr_detail",length = 70)
    private String uAddrDetail; 

    @Column(name="u_saveFileName")
    private String uSaveFileName; 

    @Column(name="u_originalFileName")
    private String uOriginalFileName; 
    
    @Column(name="u_id_role",length = 20)
    private String uIdRole = "ROLE_USER"; //권한은 일반유저 권한이 디폴트

    @Column(name = "u_regdate")
    private LocalDate uRegDate = LocalDate.now(); // 시스템 날짜 디폴트

}
