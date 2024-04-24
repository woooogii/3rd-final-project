package com.project.back.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

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

    // 결제 정보를 저장
    @PostMapping("/pedal/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> cartInfo) {
        try {
            
            System.out.println("유저~~~:" + cartInfo.get("uid"));
            System.out.println("상품명~~~:" + cartInfo.get("pid"));
            System.out.println("수량~~~:" + cartInfo.get("quantity"));

            String user = (String) cartInfo.get("uid");
            Long productId = Long.parseLong(cartInfo.get("pid").toString());
            Long quantity = Long.parseLong(cartInfo.get("quantity").toString());

            cartService.addToCart(user, productId, quantity);

            return ResponseEntity.ok("성공적!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product to cart.");
        }
    }
    // //장바구니 담는다 
    // @PostMapping("/pedal/addToCart")
    // public ResponseEntity<String> addToCart(@RequestBody Map<String, Object> cartItem) {
    //     try {
    //         String uid = (String) cartItem.get("uid");
    //         Long pid = (Long) cartItem.get("pid");
    //         Long quantity = (Long) cartItem.get("quantity");
    
    //         cartService.addToCart(uid, pid, quantity);
    
    //         return ResponseEntity.ok("장바구니에 제품이 추가되었습니다.");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니 추가 중 오류가 발생했습니다.");
    //     }
    // }


    //유저가 장바구니화면 들어오면 유저의 장바구니 목록 보내주기    
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
    

    List<ProductEntity> productInfo = new ArrayList<>();
    for (Long productId : pIds) {
        ProductEntity product = productService.findBypId(productId);
        productInfo.add(product);
    }

    System.out.println("-----보내는 장바구니 목록 아이템 수: "+ productInfo.size());

    
    return productInfo;
       
    }
    

    @Transactional
    @PostMapping("/pedal/cartRemove")
    public void removeCartOneItem(@RequestBody Map<String, String> requestData) {
        String uId = requestData.get("uid");
        String pIdString = requestData.get("pid");
        Long pId = Long.parseLong(pIdString);
        System.out.println(uId + "유저의 , 아이템 " + pId + " 이거 삭제할건데 잘 되나요?");
        cartService.removeCartItem(uId, pId);
        System.out.println("삭제 잘 됐음 ");

    }


}
