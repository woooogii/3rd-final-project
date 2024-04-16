package com.project.back.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.project.back.entity.CartEntity;
import com.project.back.entity.ProductEntity;
import com.project.back.repository.CartRepository;
@Service("CartService")
public class CartService {

    @Autowired
    @Qualifier("CartRepository")
    private CartRepository cartRepository;


    //유저가 장바구니 버튼 누르면 , user id, product id, 수량(1) 인서트
    public void addOneCart(CartEntity cartEntity){
        cartRepository.save(cartEntity);
    }

    //유저가 장바구니 페이지 들어가면 우선 유저아이디로 카트 리스트 부름
    public List<CartEntity> getMyCartList(String user){
            
        return cartRepository.findByUser(user);
        
    }

    //유저가 장바구니 페이지 들어가서 부른 카트리스트에서 product id를 활용해서 product 엔티티 반환(품명, 가격등 쓸라꼬)
    public List<ProductEntity> getMyCartItem(Long pid){

        return cartRepository.findByProductId(pid);

    }



}