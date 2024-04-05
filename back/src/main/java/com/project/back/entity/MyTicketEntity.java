package com.project.back.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
    
    @ManyToOne
    @JoinColumn(name = "t_id", nullable = false)
    private TicketEntity ticket; 
    
    @ManyToOne
    @JoinColumn(name = "u_id", nullable = false)
    private UserEntity user;

    @Column(name="mt_endtime", nullable = false)
    private LocalDateTime mtEndtime; //구매시점 + a , 이용종료시간
    
    @Column(name="my_status")
    private boolean myStatus; //이용여부

}
