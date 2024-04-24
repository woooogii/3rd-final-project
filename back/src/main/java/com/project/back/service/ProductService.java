package com.project.back.service;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.back.entity.ProductEntity;
import com.project.back.repository.ProductRepository;

import java.util.Optional;
@Service("ProductService")
public class ProductService {
    
    @Autowired
    @Qualifier("ProductRepository")
    private ProductRepository productRepository;

    //상품 저장
    public void saveProductEntity(ProductEntity productEntity){
        productRepository.save(productEntity);
    }
    //전체 리스트 출력
    public List<ProductEntity> getAllProductEntities(){
        return productRepository.findAll();
    }
    //한가지 품목 출력
    public ProductEntity findBypId(Long pId){
        Optional<ProductEntity> op = productRepository.findBypId(pId);
        return op.get();
    }

    //카테고리별 출력
    public List<ProductEntity> getCateList(String category){
        System.out.println("service: "+category);
        if(category.equals("bicycle")){
            return productRepository.findBypCategory(category);
        }else if(category.equals("equipments")){
            return productRepository.findBypCategory(category);
        }else if(category.equals("aaa")){
            return productRepository.findBypCategory(category);
        }
        return null;
    }

    //검색 데이터 출력 ing
    
    // public List<ProductEntity> searchData(String searchValue){
    //     try {
    //         List<ProductEntity> result = productRepository.findProductByPnameContaining(searchValue);
    //         if(result.isEmpty()){
    //             return Collections.emptyList(); // 빈 리스트 반환
    //         }
    //         return result;
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         throw new RuntimeException("데이터 불러오기 오류: " + e.getMessage());
    //     }
    // }

    //이미지 여러개 출력
    public List<String> findPImageUrlsBypId(Long pId){
        ProductEntity productEntity = productRepository.findBypId(pId).orElse(null);
        if (productEntity != null) {
            return productEntity.getPImageUrls();
        }
        return null;
    }

    public List<String> saveProductsWithImages(ProductEntity productEntity, List<MultipartFile> files) {
        List<String> imageUrls = new ArrayList<>();
        String url = "http://localhost:4000";
        try {
            String absolutePath = new File("").getAbsolutePath() + File.separator;
            // 실제 파일 저장 위치
            String PATH = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
                    + File.separator + "images" + File.separator + "productImg"; // 절대 경로 사용

            File productImg = new File(absolutePath + PATH);
            if (!productImg.exists()) {
                productImg.mkdirs(); // 폴더가 없을 경우 폴더 만들기
            }
    
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String contentType = file.getContentType();
                    String originalFileExtension;
                    if (contentType == null) {
                        return null;
                    } else {//확장자
                        if (contentType.contains("image/jpeg")) {
                            originalFileExtension = ".jpg";
                        } else if (contentType.contains("image/png")) {
                            originalFileExtension = ".png";
                        } else {
                            return null;
                        }
                    }
                    String originalFileName = file.getOriginalFilename();
                    int lastIndex = originalFileName.lastIndexOf('.');
                    String fileName = originalFileName.substring(0, lastIndex);
    
                    String userImgName = fileName + new Date().getTime() + originalFileExtension;
    
                    productImg = new File(absolutePath + PATH + File.separator + userImgName);
                    System.out.println("파일 저장 경로: " + absolutePath + PATH + File.separator + userImgName);
                    file.transferTo(productImg);
    
                    String imageUrl = url + "/images/productImg/" + userImgName;
                    imageUrls.add(imageUrl);
                }
            }
        } catch (Exception e) {
            System.out.print(e.toString());
            return null;
        }
        productEntity.setPImageUrls(imageUrls);
        productRepository.save(productEntity);
        return imageUrls;
    }

    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("아이디를 찾지 못했음: " + id));
    }
}
