package com.project.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back.entity.UserEntity;
@Repository("UserRepository")
public interface UserRepository extends JpaRepository<UserEntity,String>{
    
    //회원가입할 아이디 이미 존재하는 아이디인지 확인
    Boolean existsByuId(String uId);

    Optional<UserEntity> findByuId(String uId);
}
