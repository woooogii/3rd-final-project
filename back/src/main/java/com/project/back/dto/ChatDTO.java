package com.project.back.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatDTO {
    private String senderName;
    private String receiverName;
    private String message;
    private LocalDate date = LocalDate.now();
    private Status status;

    public enum Status {
        JOIN,
        MESSAGE,
        LEAVE
    }
}