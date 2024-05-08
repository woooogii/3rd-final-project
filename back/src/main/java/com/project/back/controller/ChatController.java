package com.project.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.dto.ChatDTO;
import com.project.back.entity.ChatEntity;
import com.project.back.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatService chatService;
    
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public ChatDTO receiveMessage(@Payload ChatDTO message){
        if (message.getStatus() == ChatDTO.Status.MESSAGE) {
            chatService.saveMessage(message);
        }
        System.out.println("public"+message.toString());
        return message;
    }

    @MessageMapping("/private-message")
    public ChatDTO receiverPrivateMessage(@Payload ChatDTO chatDTO){
        simpMessagingTemplate.convertAndSend("/user/" + chatDTO.getReceiverName() + "/private", chatDTO);
        chatService.saveMessage(chatDTO);
        System.out.println("private"+chatDTO.toString());
        return chatDTO;
    }

    @GetMapping("/pedal/getChats")
    public ResponseEntity<List<ChatEntity>>getChatsData() {
        try {
            List<ChatEntity> chatsData = chatService.getChatsData();
            return ResponseEntity.ok(chatsData);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
}