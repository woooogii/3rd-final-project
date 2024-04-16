package com.project.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back.entity.CartEntity;
import com.project.back.entity.ProductEntity;

@Repository("CartRepository")
public interface CartRepository extends JpaRepository<CartEntity,Long>{
    //장바구니 페이지 보여주기 위한 유저아이디로 카트 리스트 부르기
    List<CartEntity> findByUser(String user);
    //장바구니 페이지 보여주기 위한 리스트 중에서 상품번호로 프로덕트 엔티티 부르기
    List<ProductEntity> findByProductId(Long productId);

}
