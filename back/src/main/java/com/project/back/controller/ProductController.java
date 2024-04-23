package com.project.back.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


import java.util.*;
import java.nio.charset.StandardCharsets;


import com.project.back.entity.ProductEntity;
import com.project.back.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

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
                               @RequestParam("files") List<MultipartFile> files) {
        ProductEntity productEntity = new ProductEntity();
        try {
            // 상품 정보 저장
            productEntity.setPName(pName);
            productEntity.setPCategory(pCategory);
            productEntity.setPPrice(pPrice);
            productEntity.setPDescription(pDescription);

            productService.saveProductsWithImages(productEntity,files);
        } catch (Exception e) {
            System.out.print(e.toString());
        }
        return "pedal/product/list";
    }
    
    //지은 전체 리스트 출력
    @GetMapping("/product/list")
    public List<ProductEntity> getAllProduct(){
        return productService.getAllProductEntities();
    }

    @GetMapping("/product/image/{pid}")
    public ResponseEntity<List<String>> getProductWithImage(@PathVariable("pid") Long id){
        try {
            List<String> imgUrls = productService.findPImageUrlsBypId(id);
            List<String> encodedUrls = new ArrayList<>();
            for (String url : imgUrls) {
                String encodedUrl = UriUtils.encode(url, StandardCharsets.UTF_8);
                encodedUrls.add(encodedUrl);
            }
            return ResponseEntity.ok(encodedUrls);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
