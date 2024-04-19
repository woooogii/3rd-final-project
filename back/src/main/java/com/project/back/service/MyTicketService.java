package com.project.back.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.entity.MyTicketEntity;
import com.project.back.repository.MyTicketRepository;


@Service
public class MyTicketService {
    
 @Autowired
    private MyTicketRepository myTicketRepository;

    //DB에 저장
    public void saveMyTicketEntity(MyTicketEntity myTicketEntity){
        myTicketRepository.save(myTicketEntity);
        System.out.println("내 구매내역 DB :"+myTicketEntity);
    }

    //전체리스트 출력 
    public List<MyTicketEntity> getAllMyTicketEntities(){
        return myTicketRepository.findAll();
    }

    public MyTicketEntity getMyTicketByUidAndMtName(String uid, String mtName) {
        return myTicketRepository.findByUidAndMtName(uid, mtName);
    }

    //하나의 트랜잭션에서 일어나야 함,다른 곳에서 작업이 이루어지면 안됨
    @Transactional
    public void ticketStatus(String mtMerchantUid, boolean newStatus){

        MyTicketEntity ticket = myTicketRepository.findByMtMerchantUid(mtMerchantUid);
        // 티켓 상태 변경하고 저장
        if (ticket != null) {
            ticket.setMyStatus(newStatus);
            myTicketRepository.save(ticket);
        } else {
            throw new IllegalArgumentException("해당 상품이 존재하지 않습니다.");
        }
    }
}
