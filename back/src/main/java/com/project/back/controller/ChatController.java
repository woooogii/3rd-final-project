package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.ChatDTO;


@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public ChatDTO receiveMessage(@Payload ChatDTO message){
        return message;
    }

    @MessageMapping("/private- message")
    public ChatDTO receiverPrivateMessage(@Payload ChatDTO chatDTO){
        simpMessagingTemplate.convertAndSend("/user/" + chatDTO.getReceiverName() + "/private", chatDTO);
        System.out.println(chatDTO.toString());
        return chatDTO;
    }
}
