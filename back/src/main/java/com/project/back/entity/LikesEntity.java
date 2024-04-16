package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "likes")
@Getter
@Setter
public class LikesEntity {//좋아요 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "l_id")
    private Long lId; // 각 좋아요 번호

 
    @Column(name = "r_id")
    private Long review;
    //참조하는 리뷰 (좋아요 누른 댓글 번호)

    
    @Column(name = "u_id")
    private String user;
    //좋아요 누른 사람
}

