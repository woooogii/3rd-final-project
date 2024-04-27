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

import com.project.back.dto.CartDTO;
import com.project.back.dto.CartDTO;
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

    @PostMapping("/pedal/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> cartInfo) {
        try {
            String user = (String) cartInfo.get("uid");
            Long productId = Long.parseLong(cartInfo.get("pid").toString());
            Long quantity = Long.parseLong(cartInfo.get("quantity").toString());

            cartService.addToCart(user, productId, quantity);

            return ResponseEntity.ok("Product successfully added to cart.");
            return ResponseEntity.ok("Product successfully added to cart.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product to cart.");
        }
    }


    @GetMapping("/pedal/mycart")
    public List<CartDTO> showMyCart(@RequestParam String uid) {
        List<CartEntity> cartItems = cartService.getMyCartList(uid);
        List<CartDTO> cartInfo = new ArrayList<>();

        for (CartEntity cartItem : cartItems) {
            Long productId = cartItem.getProductId();
            ProductEntity product = productService.findBypId(productId);

            if (product != null) {
                CartDTO cartDTO = new CartDTO();        
                cartDTO.setPId(product.getPId());
                cartDTO.setPName(product.getPName());
                cartDTO.setPPrice(product.getPPrice());
                cartDTO.setPDescription(product.getPDescription());
                cartDTO.setPImage1(product.getPImage1());
                cartDTO.setPImage2(product.getPImage2());
                cartDTO.setPImage3(product.getPImage3());
                cartDTO.setPImage4(product.getPImage4());
                cartDTO.setPImageUrls(product.getPImageUrls());
                cartDTO.setCAmount(cartItem.getCAmount());
                cartInfo.add(cartDTO);
            }
        }
        
        return cartInfo;
    }

    @Transactional
    @PostMapping("/pedal/cartRemove")
    public ResponseEntity<String> removeCartOneItem(@RequestBody Map<String, String> requestData) {
    public ResponseEntity<String> removeCartOneItem(@RequestBody Map<String, String> requestData) {
        String uId = requestData.get("uid");
        Long pId = Long.parseLong(requestData.get("pid"));

        try {
            cartService.removeCartItem(uId, pId);
            return ResponseEntity.ok("Cart item removed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove cart item.");
        }
        Long pId = Long.parseLong(requestData.get("pid"));

        try {
            cartService.removeCartItem(uId, pId);
            return ResponseEntity.ok("Cart item removed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove cart item.");
        }
    }
}
