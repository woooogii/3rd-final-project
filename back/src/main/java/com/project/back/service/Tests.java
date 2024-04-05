package com.project.back.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.project.back.entity.Test;
import com.project.back.repository.Tester;

@Service
public class Tests {
    @Autowired
    private Tester tester;

    public void svaeTestEntity(Test te){
        tester.save(te);
    }

    public List<Test> getAllTest() {
        return tester.findAll();
    }

}
