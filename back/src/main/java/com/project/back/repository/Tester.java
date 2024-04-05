package com.project.back.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.Test;

public interface Tester extends JpaRepository<Test,Long>{

}
