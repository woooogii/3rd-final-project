package com.project.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back.entity.CartEntity;
import com.project.back.entity.ProductEntity;

@Repository("CartRepository")
public interface CartRepository extends JpaRepository<CartEntity,Long>{
    
    CartEntity findByUserAndProductId(String user, Long productId);
    
    //장바구니 페이지 보여주기 위한 유저아이디로 카트 리스트 부르기
    List<CartEntity> findByUser(String user);
    //장바구니 페이지 보여주기 위한 리스트 중에서 상품번호로 프로덕트 엔티티 부르기
    List<ProductEntity> findByProductId(Long productId);

    //장바구니 삭제 로그인한 유저 ID와 삭제하려는 PRODUCT ID 두가지를 받아서 그 줄 삭제 
    void deleteByUserAndProductId(String user, Long productId);
}
