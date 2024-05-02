package com.project.back.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity,Long>{
     List<ReviewEntity> findBypId(Long pId);
     long countBypId(Long pId);
     void deleteById(Long rId);
}
