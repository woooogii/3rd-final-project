package com.project.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {


    private String uId; 
    //Email로 아이디 사용
    
    private String uPwd; 

    private String uName; 

    private String uPhone; 

    private String uAddress; 

    private String uaddrdetail; 
                
    private String uSaveFileName; 

    private String uOriginalFileName; 

    private String uIdRole;

 
}
