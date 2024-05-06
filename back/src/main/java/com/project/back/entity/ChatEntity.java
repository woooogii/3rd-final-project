package com.project.back.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "chat")
@Getter
@Setter
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @Column(name = "uid")
    private String senderName;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "message")
    private String message;

    @Column(name = "message_date")
    private LocalDateTime date = LocalDateTime.now();
}
