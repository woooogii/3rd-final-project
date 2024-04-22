package com.project.back.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.lang3.ObjectUtils;


import java.util.*;

import java.io.File;


import com.project.back.entity.ProductEntity;
import com.project.back.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/pedal")
public class ProductController {
    
    @Autowired
    @Qualifier("ProductService")
    private ProductService productService;

    /*  수인 아이템 인풋 테스트
    @PostMapping("/products")
    public void saveProductEntity(@RequestBody ProductEntity productEntity) {
        System.out.println(productEntity);
        productService.saveProductEntity(productEntity);
    }
    */

        //지은 아이템 인풋 실제 사용

        @PostMapping("/product/created")
        public String createdProduct(@RequestParam("pname") String pName,
                                   @RequestParam("pcategory") String pCategory,
                                   @RequestParam("pprice") Long pPrice,
                                   @RequestParam("pdescription") String pDescription,
                                   @RequestParam("file") MultipartFile file) {
            ProductEntity productEntity = new ProductEntity();
            try {
                // 상품 정보 저장
                productEntity.setPName(pName);
                productEntity.setPCategory(pCategory);
                productEntity.setPPrice(pPrice);
                productEntity.setPDescription(pDescription);
        
                // 이미지 파일 저장
                String absolutePath = new File("").getAbsolutePath()+File.separator;
    
                // 파일 저장 위치
                String PATH = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
                        + File.separator + "images" + File.separator + "userImg"; // 절대 경로 사용
        
                File productImg = new File(absolutePath+PATH);
                if (!productImg.exists()) {
                    productImg.mkdirs(); // 폴더가 없을 경우 폴더 만들기
                }
                if(!file.isEmpty()){
                    String contentType = file.getContentType();
                    String originalFileExtension;
                    if(ObjectUtils.isEmpty(contentType)){
                        return null;
                    }else{
                        if(contentType.contains("image/jpeg")){
                            originalFileExtension = ".jpg";
                        }else if(contentType.contains("image/png")){
                            originalFileExtension = ".png";
                        }else{
                            return null;
                        }
                    }
                    String originalFileName = file.getOriginalFilename();
                    int lastIndex = originalFileName.lastIndexOf('.');
                    String fileName = originalFileName.substring(0, lastIndex);
    
                    String userImgName =  fileName + new Date().getTime()+ originalFileExtension;
                    
                    productImg = new File(absolutePath+PATH+File.separator+userImgName);
                    System.out.println("파일 저장 경로: "+absolutePath+PATH+File.separator+userImgName);
                    file.transferTo(productImg);
    
                    productEntity.setPImageUrl(PATH+File.separator+userImgName);
                    }
            } catch (Exception e) {
                System.out.print(e.toString());
            }
            productService.saveProductEntity(productEntity);
            return "/product/list";
        }
    
    //지은 전체 리스트 출력
    @GetMapping("/product/list")
    public List<ProductEntity> getAllProduct(){
        return productService.getAllProductEntities();
    }

 //지은 이미지 출력
    @GetMapping("/product/image/{pid}")//이미지 한개만
    public ResponseEntity<byte[]> getProductWithImage(@PathVariable("pid") Long id){
        try {
            byte[] imageUrls = productService.getProductImg(id);
            System.out.println(imageUrls);

            if(imageUrls != null && imageUrls.length>0){
                MediaType contentType = MediaType.IMAGE_JPEG;
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(contentType);
                return new ResponseEntity<>(imageUrls,headers,HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
        } catch (Exception e) {
            System.out.println(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //수인 상세페이지 
    @GetMapping("/productDetail/{pId}")
    public ResponseEntity<ProductEntity> findBypId(@PathVariable Long pId) {
        ProductEntity productData = productService.findBypId(pId);
        return ResponseEntity.ok(productData);
    }


    //수인 리뷰를 위한 pid찾기 
    @GetMapping("/products/{id}")
    public ProductEntity getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

}
