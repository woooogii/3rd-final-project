package com.project.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.back.dto.ChatDTO;
import com.project.back.entity.ChatEntity;
import com.project.back.repository.ChatRepository;

@Service
public class ChatService {
    @Autowired ChatRepository chatRepository;

    public void saveMessage(ChatDTO chatDTO){
        ChatEntity chatEntity = new ChatEntity();
        chatEntity.setSenderName(chatDTO.getSenderName());
        chatEntity.setReceiverName(chatDTO.getReceiverName());
        chatEntity.setSendMessage(chatDTO.getSendMessage());
        chatEntity.setReceiveMessage(chatDTO.getReceiveMessage());
        chatEntity.setDate(chatDTO.getDate());

        chatRepository.save(chatEntity);
    }

    public List<ChatEntity> getChatsData(){
        return chatRepository.findAll();
    }
    
}
