package com.project.back.service;

import java.io.File;
import java.util.*;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.back.entity.ProductEntity;
import com.project.back.repository.ProductRepository;
@Service("ProductService")
public class ProductService {
    
    @Autowired
    @Qualifier("ProductRepository")
    private ProductRepository productRepository;

    @Resource
    private Environment environment;
    

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

    public List<String> saveProductsWithImages(ProductEntity productEntity, List<MultipartFile> files) {
        List<String> imageUrls = new ArrayList<>();
        String url = "http://localhost:4000";
        try {
            // 파일 업로드 경로 설정
            String PATH = environment.getProperty("file.upload.path");
            // 상대 경로를 절대 경로로 변경
            String absolutePath = new File(PATH).getAbsolutePath();
            System.out.println("절대 경로"+absolutePath);
            // 파일이 실제로 저장될 디렉토리 생성
            File productImg = new File(absolutePath);
            if (!productImg.exists()) {
                productImg.mkdirs(); // 폴더가 없을 경우 폴더 만들기
                System.out.println("디렉토리 생성 성공: " + productImg.getAbsolutePath());
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

                    productImg = new File(absolutePath + File.separator + userImgName);
                    System.out.println("파일 저장 경로: " + absolutePath + File.separator + userImgName);
                    file.transferTo(productImg);

                    String imageUrl = url + "/images/" + userImgName;
                    imageUrls.add(imageUrl);
                }
            }
        } catch (Exception e) {
            System.out.print(e.toString());
            return null;
        }
        productEntity.setProductImages(imageUrls);
        productRepository.save(productEntity);
        return imageUrls;
    }
    
    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("아이디를 찾지 못했음: " + id));
    }
    public List<ProductEntity> searchData(String keyword){
        try {
            System.out.println("service"+keyword);
            List<ProductEntity> result = productRepository.findProductBypNameContaining(keyword);
            System.out.println("service"+result);
            if (result.isEmpty()) {
                return Collections.emptyList(); // 빈 리스트 반환
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("데이터 불러오기 오류: " + e.getMessage());
        }
    }
}
