package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back.entity.ChatEntity;
@Repository("ChatRepository")
public interface ChatRepository extends JpaRepository<ChatEntity,Long>{
    
}
