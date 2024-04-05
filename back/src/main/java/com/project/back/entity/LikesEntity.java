package com.project.back.entity;


import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;


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

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "r_id")
    private ReviewEntity review;
    //참조하는 리뷰 (좋아요 누른 댓글 번호)

    @ManyToOne
    @JoinColumn(name = "u_id")
    private UserEntity user;
    //좋아요 누른 사람
}

