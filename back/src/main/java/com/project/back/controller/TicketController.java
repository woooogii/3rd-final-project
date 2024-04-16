package com.project.back.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.back.entity.TicketEntity;
import com.project.back.service.TicketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/pedal")
public class TicketController {
    
    @Autowired
    private TicketService ticketService;

    @PostMapping("/tickets")
    public void saveTicketEntity(@RequestBody TicketEntity ticketEntity){
        System.out.println(ticketEntity);
        ticketService.saveTicketEntity(ticketEntity);
    }

    //모든티켓 조회
    @GetMapping("/purchase")
    public List<TicketEntity> getAllTicketEntities(){
        return ticketService.getAllTicketEntities();
    }

    // //티켓Id로 조회
    // @GetMapping("/pedal/purchase")
    // public ResponseEntity<TicketEntity> findByTid(@RequestParam long tId) {
    //     TicketEntity ticketData = ticketRepository.findByTid(tId);

    //     if (ticketData != null) {
    //         return ResponseEntity.ok(ticketData);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
    


}
