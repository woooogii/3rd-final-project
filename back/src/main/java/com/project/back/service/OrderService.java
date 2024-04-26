package com.project.back.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.entity.OrderEntity;
import com.project.back.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public void saveOrder(OrderEntity orderEntity){
        orderRepository.save(orderEntity);
    }

    
    @Transactional
    public void saveOrders(List<OrderEntity> orderEntities) {
        orderRepository.saveAll(orderEntities);
    }



    //전체리스트 출력 
    public List<OrderEntity> getAllOrderEntities(String uid){
        return orderRepository.findAllByUid(uid);
    }
}
