package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.project.back.entity.CartEntity;
import com.project.back.entity.ProductEntity;
import com.project.back.service.CartService;
import com.project.back.service.ProductService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
public class CartController {
    
    @Autowired
    @Qualifier("CartService")
    private CartService cartService;

    @Autowired 
    private ProductService productService;


 
    //장바구니 담는다 
    @PostMapping("/pedal/cart")
    public void addCart(@RequestBody CartEntity cartEntity) {

        cartService.addOneCart(cartEntity);
    }

    @GetMapping("/pedal/mycart")
    public List<ProductEntity> showMyCart(@RequestParam String uid) {
        
    // 유저 id를 받아서 카트에 있는 항목들을 가져옴
    List<CartEntity> cartItems = cartService.getMyCartList(uid);
    
    // 위에서 받아온 데이터중에서 product id들을 담음
    List<Long> pIds = new ArrayList<>();
    for (CartEntity cartItem : cartItems) {
        Long productId = cartItem.getProductId();
        pIds.add(productId);
    }
    
    System.out.println("데이터수: " + pIds.size());
    
    if(uid.equals("")||uid==null){
        System.out.println("유저못불렀음");
    } else {
        System.out.println("유저: "+uid);
    }
    

    //List<ProductEntity> productInfo = cartService.getMyCartItem(pIds.getid);


    // 아직은 빈 리스트를 반환하도록 설정
    return Collections.emptyList();
        
        
        //return null;
    }
    
    

    /*
    @GetMapping("/pedal/mycart")
    public List<ProductEntity> getMyCartList (@RequestParam String user) {
        return cartService.getCartItems(user);
    }
     */

}
