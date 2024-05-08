package com.project.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.project.back.entity.ProductEntity;

@Repository("ProductRepository")
public interface ProductRepository extends JpaRepository<ProductEntity,Long>{
    Optional<ProductEntity> findBypId(Long pId);
    List<String> findPImageUrlsBypId(Long pId);

    //자전거
    @Query("SELECT p FROM product p WHERE p.pCategory = ?1")
    List<ProductEntity> findBypCategory(String category);


    @Query("SELECT p FROM product p WHERE p.pName LIKE %:keyword%")
    List<ProductEntity> findProductBypNameContaining(String keyword);
}
