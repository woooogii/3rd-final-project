package com.project.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.entity.TicketEntity;
import com.project.back.repository.TicketRepository;

@Service
public class TicketService {
    
    @Autowired
    private TicketRepository ticketRepository;

    //DB저장
    public void saveTicketEntity(TicketEntity ticketEntity){
        ticketRepository.save(ticketEntity);
    }

    //전체리스트 출력 
    public List<TicketEntity> getAllTicketEntities(){
        return ticketRepository.findAll();
    }
    
    // // 티켓 ID로 조회
    // public TicketEntity findByTid(Long tId) {
    //     return ticketRepository.findByTid(tId);
    // }
}
