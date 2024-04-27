package com.project.back.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.OrderDTO;
import com.project.back.entity.OrderEntity;
import com.project.back.entity.ProductEntity;
import com.project.back.service.OrderService;
import com.project.back.service.ProductService;

@RestController
@Transactional
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    ProductService productService;

    // 결제 정보를 저장
    @SuppressWarnings("unchecked")
    @PostMapping("/pedal/saveMyOrder")
    public ResponseEntity<?> saveOrderEntity(@RequestBody Map<String, Object> myOrderInfo) {

        System.out.println("-----------------------------여기봐봐"+myOrderInfo);

        // OrderEntity 객체를 담을 리스트 생성
        List<OrderEntity> orderEntities = new ArrayList<>();

        // 상품 ID와 수량을 추출하여 OrderEntity 객체 생성 후 리스트에 추가
        Map<String, Object> amounts = (Map<String, Object>) myOrderInfo.get("amounts");
        for (Map.Entry<String, Object> entry : amounts.entrySet()) {
            Integer productId = Integer.parseInt(entry.getKey());
            Integer amount = Integer.parseInt(entry.getValue().toString());

            // OrderEntity 객체 생성 및 값 설정
            OrderEntity orderEntity = new OrderEntity();
            orderEntity.setOId((String) myOrderInfo.get("oId"));
            orderEntity.setUid((String) myOrderInfo.get("user"));
            orderEntity.setOBuyDate((String) myOrderInfo.get("oBuyDate"));
            orderEntity.setProductId(productId);
            orderEntity.setAmount(amount);

            // 생성된 OrderEntity 객체를 리스트에 추가
            orderEntities.add(orderEntity);

            // 저장된 OrderEntity 출력
            System.out.println("주문 정보 저장 완료: " + orderEntity);
        }

        // OrderEntity 리스트를 서비스를 통해 저장
        orderService.saveOrders(orderEntities);

        return ResponseEntity.ok(orderEntities);
    }


 
    //내 구매 내역 조회 
    //클라이언트가 티켓 목록을 요청할 때

    //1. 유저 아이디로 우선 오더리스트 목록들 싹 다 불러오기 
    //2. 불러온 pid로 또 상품 정보 목록들 싹 불러오기 
    //3. DTO하나 파서 , 1.상품이미지(p) , 2.상품명(p), 3.가격(p), 4.수량(o), 5. 구매일(o)
    //4. 담아서 반환 List

    @GetMapping("/pedal/orderList")
    public List<OrderDTO> showMyOrder(@RequestParam String uid) {
        List<OrderEntity> orders = orderService.getAllOrderEntities(uid);
        List<OrderDTO> orderinfo = new ArrayList<>();
        
        for (OrderEntity order: orders) {
            Long productId = order.getProductId().longValue();
            Integer amount = order.getAmount();
            String date = order.getOBuyDate();
            Long orderNum = order.getONum();
            ProductEntity product = productService.findBypId(productId);
            
            if(product != null){
                OrderDTO orderDTO = new OrderDTO();
                orderDTO.setPImage(product.getPImage1());
                orderDTO.setPName(product.getPName());
                orderDTO.setPPrice(product.getPPrice());
                orderDTO.setAmount(amount.longValue());
                orderDTO.setOrderDate(date);
                orderDTO.setONum(orderNum);
                orderinfo.add(orderDTO);
            }
        }

        return orderinfo;
    }





}
