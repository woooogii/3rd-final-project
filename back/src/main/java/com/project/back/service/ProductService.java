package com.project.back.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.List;
import com.project.back.entity.ProductEntity;
import com.project.back.repository.ProductRepository;
import java.util.Optional;
@Service("ProductService")
public class ProductService {
    
    @Autowired
    @Qualifier("ProductRepository")
    private ProductRepository productRepository;


    public void saveProductEntity(ProductEntity productEntity){
        productRepository.save(productEntity);
    }

    public List<ProductEntity> getAllProductEntities(){
        return productRepository.findAll();
    }

    public ProductEntity findBypId(Long pId){
        Optional<ProductEntity> op = productRepository.findBypId(pId);
        return op.get();
    }
}
