package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.project.back.entity.ProductEntity;

@Repository("ProductRepository")
public interface ProductRepository extends JpaRepository<ProductEntity,Long>{
    Optional<ProductEntity> findBypId(Long pId);
    String findPImageUrlsBypId(Long pId);
}
