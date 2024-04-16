package com.project.back.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


import java.util.*;

import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.*;
import java.io.IOException;


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
    public String createdProduct(@RequestParam("pname") String pName,@RequestParam("pcategory") String pCategory,
    @RequestParam("pprice") Long pPrice,@RequestParam("pdescription") String pDescription,
    @RequestParam("files") List<MultipartFile> files) {
            
        ProductEntity productEntity = new ProductEntity();
        try {
            //상품 정보 저장
            productEntity.setPName(pName);
            productEntity.setPCategory(pCategory);
            productEntity.setPPrice(pPrice);
            productEntity.setPDescription(pDescription);
            
            //이미지 파일 저장
            List<String> imageUrls = new ArrayList<>();
            String UPLOAD_PATH = System.getProperty("user.home") + "/Desktop/images/";//파일 경로
            ///Users/gimjieun/Desktop

            File fileSave = new File(UPLOAD_PATH);
            if (!fileSave.exists()) {
                fileSave.mkdirs(); // 폴더가 없을 경우 폴더 만들기
            }

            for (MultipartFile file : files) {
                //System.out.println("Received file: " + file.getOriginalFilename());//잘넘어옴
                String fileName = new Date().getTime() + "_" + file.getOriginalFilename();
                String filePath = UPLOAD_PATH + fileName;

                File dest = new File(filePath);
                file.transferTo(dest);
                imageUrls.add(filePath); // 이미지 파일 경로를 리스트에 추가
            }
            System.out.println("이미지: "+imageUrls);
            // 상품 엔티티에 이미지 파일 경로 저장
            productEntity.setPImageUrls(imageUrls);

        } catch (Exception e) {
            System.out.print(e.toString());
        }
        productService.saveProductEntity(productEntity);
            return "/product/list";
    }

    @GetMapping("/product/list")
    public ResponseEntity<List<ProductEntity>> getAllProductWithImage(HttpServletResponse response) {
        List<ProductEntity> products = productService.getAllProductEntities();
        if (products == null || products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

    return ResponseEntity.ok().body(products);
    }

    @GetMapping("/product/image={id}")
    public ResponseEntity<ProductEntity> getProductWithImage(@PathVariable Long id, HttpServletResponse response) {
        ProductEntity product = productService.findBypId(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        // 이미지 파일을 읽어와서 바이트 배열로 변환
        List<String> imageUrls = product.getPImageUrls();
        if (imageUrls != null && !imageUrls.isEmpty()) {
            String firstImageUrl = imageUrls.get(0); // 첫 번째 이미지 경로만 사용

            try {
                Path imagePath = Paths.get(firstImageUrl);
                byte[] imageBytes = Files.readAllBytes(imagePath);

                // 이미지의 확장자에 따라 MediaType 설정
                MediaType contentType = MediaType.IMAGE_JPEG;
                if (firstImageUrl.toLowerCase().endsWith(".png")) {
                    contentType = MediaType.IMAGE_PNG;
                } else if (firstImageUrl.toLowerCase().endsWith(".gif")) {
                    contentType = MediaType.IMAGE_GIF;
                }

                
                // 상품 정보와 이미지를 함께 반환
                //product.setPImageBytes(imageBytes); // 이미지를 설정
                return ResponseEntity.ok()
                        .contentType(contentType)
                        .body(product);
            } catch (IOException e) {
                // 이미지 파일을 읽어오는 도중 오류 발생 시
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        // 이미지가 없는 경우에는 상품 정보만 반환
        return ResponseEntity.ok().body(product);
    }





    //수인 상세페이지 
    @GetMapping("/productDetail/{pId}")
    public ResponseEntity<ProductEntity> findBypId(@PathVariable Long pId) {
        ProductEntity productData = productService.findBypId(pId);
        return ResponseEntity.ok(productData);
    }


}
