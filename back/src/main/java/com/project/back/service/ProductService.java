package com.project.back.service;

//수동 import
import java.io.IOException;
import java.nio.file.*; 
import org.apache.commons.lang3.StringUtils;//그래들도 추가해야함

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

    public byte[] getProductImg(Long pId) throws IOException{
        Optional<ProductEntity> prOptional = productRepository.findBypId(pId);
        if(prOptional.isPresent()){
            ProductEntity productEntity = prOptional.get();
            String productImg = productEntity.getPImageUrl();
            if(!StringUtils.isEmpty(productImg)){
                Path imgPath = Paths.get(productImg);
                if(Files.exists(imgPath)){
                    return Files.readAllBytes(imgPath);
                }else{
                    System.out.println("error_Files");
                }
            }else{
                System.out.println("error_isEmpty");
            }
        }else{
            System.out.println("error_isPresent");
        }
        return new byte[0];
    }

    /*
    //지은 여러개 이미지 출력(수정중)
    public List<byte[]> getProductSubImg(Long pId) throws IOException{
        List<byte[]> subImages = new ArrayList<>();
        Optional<ProductEntity> prOptional = productRepository.findBypId(pId);
        if(prOptional.isPresent()){
            ProductEntity productEntity = prOptional.get();
            List<String> productSubImgs = productEntity.getSubImgUrls();
            for(String subImg : productSubImgs){
                if(!StringUtils.isEmpty(subImg)){
                    Path imgPath = Paths.get(subImg);
                    //System.out.println(subImagesubImg);//찍힘
                    if(Files.exists(imgPath)){
                        byte[] imageData = Files.readAllBytes(imgPath);
                        subImages.add(imageData);
                    }else{
                        System.out.println("error_Files");
                    }
                }else{
                    System.out.println("error_isEmpty");
                }
            }
        }else{
            System.out.println("error_isPresent");
        }
        //System.out.println("subImages"+subImages);//찍힘
        return subImages;
    } */

    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("아이디를 찾지 못했음: " + id));
    }
}
