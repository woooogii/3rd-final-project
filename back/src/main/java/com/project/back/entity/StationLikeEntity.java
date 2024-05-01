package com.project.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "station_like")
@Getter
@Setter
public class StationLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slike_id")
    private Long likeId;

    @Column(name = "u_id")
    private String user;

    @Column(name = "s_id")
    private Long stationId;

    @Column(name = "done")
    private boolean status = false;

}
