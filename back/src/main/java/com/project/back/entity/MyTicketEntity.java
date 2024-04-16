package com.project.back.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "my_ticket")
@Getter
@Setter
public class MyTicketEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="mt_id")
    private Long mtId; //구매번호
    
  
    @Column(name = "t_id", nullable = false)
    private Long ticket; 
    //Ticket 참조, 사용자가 구매한 티켓 id
    
  
    @Column(name = "u_id", nullable = false)
    private String user;
    //User 참조, 사용자 id

    @Column(name="mt_endtime", nullable = false)
    private LocalDateTime mtEndtime; //구매시점 + a , 이용종료시간
    
    @Column(name="my_status")
    private boolean myStatus; //이용여부

}
