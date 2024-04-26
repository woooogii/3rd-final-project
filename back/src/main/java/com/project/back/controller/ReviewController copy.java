// package com.project.back.controller;

// import java.util.List;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.project.back.entity.ReviewEntity;
// import com.project.back.service.ReviewService;


// @RestController
// @RequestMapping("/pedal")
// public class ReviewController {

//     @Autowired
//     private ReviewService reviewService;

//     // 리뷰 저장
//     @PostMapping("/review")
//     public ResponseEntity<ReviewEntity> saveReview(@RequestBody ReviewEntity reviewEntity) {
//         reviewService.saveReview(reviewEntity);
//         return ResponseEntity.ok(reviewEntity);
//     }

//     // 모든 리뷰 조회
//     @GetMapping("/reviewAll")
//     public List<ReviewEntity> getAllReviews() {
//         return reviewService.getAllReviews();
//     }

//     // // 특정 상품에 대한 리뷰 조회
//     // @GetMapping("/reviewOne/{pId}")
//     // public ReviewEntity getReviewById(@PathVariable Long pId) {
//     //     return reviewService.getReviewById(pId);
//     // }


//     // @putMapping = Http관련 통신이라서 ResponseEntity써야함 / 업데이트하거나 생성할 때 씀
//     // Spring Framework에서 사용되는 메서드 시그니처
//     // @RequestBody ReviewEntity reviewEntity = 요청할 때 보낸 리뷰 데이터 + json형식으로 변환역할
//     @PostMapping("/updateReview/{pId}") // 상품 아이디로 리뷰를 수정
//     public ResponseEntity<ReviewEntity> updateReview(@PathVariable Long pId, @RequestBody ReviewEntity reviewEntity) {
//         System.out.println("실행돼?" + reviewEntity);

//         ReviewEntity preReview = reviewService.getReviewByProductId(pId); // 상품 아이디로 리뷰를 가져옴

//         if (preReview != null) {
//             preReview.setRContent(reviewEntity.getRContent());
//             preReview.setRDate(reviewEntity.getRDate());
//             preReview.setRStar(reviewEntity.getRStar());
//             preReview.setPId(reviewEntity.getPId());
//             preReview.setUId(reviewEntity.getUId());

//             reviewService.saveReview(preReview);
//             System.out.println("기존에 있던 리뷰~~" + preReview);

//             return ResponseEntity.ok(preReview);
//         } else {
//             return ResponseEntity.notFound().build(); // (주로 컨트롤러에서 사용)서버에 존재하지 않을 때
//         }
//     }

//     //리뷰삭제
//     @DeleteMapping("/deleteReview/{pId}")
//     public ResponseEntity<?> deleteReview(@PathVariable Long pId){
      
//         try {

//             reviewService.deleteReview(pId);
//             return ResponseEntity.ok().build();

//         } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//         }
//     }

// }