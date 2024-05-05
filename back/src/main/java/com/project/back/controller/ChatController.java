package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.ChatDTO;
import com.project.back.service.ChatService;


@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatService chatService;
    
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public ChatDTO receiveMessage(@Payload ChatDTO message){
        chatService.saveMessage(message);//저장됨
        System.out.println("public"+message.toString());
        return message;
    }

    @MessageMapping("/private-message")
    public ChatDTO receiverPrivateMessage(@Payload ChatDTO chatDTO){
        simpMessagingTemplate.convertAndSend("/user/" + chatDTO.getReceiverName() + "/private", chatDTO);
        chatService.saveMessage(chatDTO);//저장됨
        System.out.println("private"+chatDTO.toString());
        return chatDTO;
    }


}
