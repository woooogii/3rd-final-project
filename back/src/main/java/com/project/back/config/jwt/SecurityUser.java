package com.project.back.config.jwt;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import com.project.back.entity.UserEntity;

public class SecurityUser extends User{
    
    private UserEntity user;

    public SecurityUser(UserEntity user){
        super(user.getUId().toString(), user.getUPwd(),AuthorityUtils.createAuthorityList(user.getUIdRole().toString()));
        this.user = user;
    }

    public UserEntity getMember() {
        return user;
    }
}
