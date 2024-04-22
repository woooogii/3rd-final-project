package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "review")
@Getter
@Setter
public class ReviewEntity {
    
    @Id
    @Column(name = "r_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rId; //댓글 번호

    @Column(name = "r_content", length=300)
    private String rContent; // 댓글 내용

    @Column(name = "r_date")
    private String rDate; // 댓글 날짜

    @Column(name = "r_star")
    private Long rStar; // 별점 수

    @Column(name = "p_id")
    private Long pId;
  
    @Column(name = "u_id")
    private String uId;
    // User 참조, 댓글 쓴 user_id
}
