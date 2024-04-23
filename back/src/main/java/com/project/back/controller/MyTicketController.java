package com.project.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.back.entity.MyTicketEntity;
import com.project.back.service.MyTicketService;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/pedal")
public class MyTicketController {

   @Autowired
    private MyTicketService myTicketService;


    // 결제 정보를 저장
    @PostMapping("/saveMyTicketList")
    public ResponseEntity<?> saveMyTicketEntity(@RequestBody Map<String, Object> myTicketInfo) {

       
        // MyTicketEntity 객체 생성 및 값 설정
        MyTicketEntity myTicketEntity = new MyTicketEntity();

        myTicketEntity.setMtName((String) myTicketInfo.get("mtName"));
        myTicketEntity.setMtAmount((int) myTicketInfo.get("mtAmount"));
        myTicketEntity.setMtMerchantUid((String) myTicketInfo.get("mtMerchantUid"));
        myTicketEntity.setMtPayTime((String) myTicketInfo.get("mtPayTime"));
        // myTicketEntity.setMtStartTime((LocalDateTime)myTicketInfo.get("mtStartTime"));
        // myTicketEntity.setMtEndTime((LocalDateTime)myTicketInfo.get("mtEndTime"));

        myTicketEntity.setUid((String) myTicketInfo.get("uid"));
        myTicketEntity.setUname((String) myTicketInfo.get("uname"));
        
        // PaymentEntity 저장
        myTicketService.saveMyTicketEntity(myTicketEntity);

        // 저장된 PaymentEntity 출력
        System.out.println("결제 정보 저장 완료: " + myTicketEntity);
        System.out.println("------------------PaymentEntity 정보:");
        for (Map.Entry<String, Object> entry : myTicketInfo.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        return ResponseEntity.ok(myTicketEntity);
    }


    //내 모든 티켓 조회
    @GetMapping("/myTicketList")
    public List<MyTicketEntity> getAllMyTicketEntities() {
        List<MyTicketEntity> tickets = myTicketService.getAllMyTicketEntities();
    
        // 티켓 정보와 myStatus 필드를 로그로 출력
        for (MyTicketEntity ticket : tickets) {
            System.out.println("Ticket ID: " + ticket.getMtId());
            System.out.println("Ticket Name:" + ticket.getMtName());
            // 이하 필요한 다른 필드들도 추가로 출력 가능
            System.out.println("My Status: " + ticket.isMyStatus());
            System.out.println("--------------------------------");
        }
        
        return tickets;
    }


    //메인에서 버튼 클릭하면 실시간으로 티켓 이용여부 반영
    @PostMapping("/ticketStatus")
    public ResponseEntity<?> ticketStatus(@RequestBody Map<String, Object> requestBody){
        try {
            
          String mtMerchantUid = (String) requestBody.get("mtMerchantUid");
          boolean newStatus = (boolean) requestBody.get("newStatus");
          String startTime = (String) requestBody.get("startTime");

          System.out.println("티켓이용여부------:"+ mtMerchantUid );
          System.out.println("상태업데이트------:"+ newStatus );
          System.out.println("스위치 누른 시간------:"+ startTime );

          //특정 상품번호에 대한 티켓 사용여부 업데이트
          myTicketService.ticketStatus(mtMerchantUid,newStatus,startTime);

          return ResponseEntity.ok("티켓 상태가 성공적으로 변경되었습니다!");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("티켓 상태 변경 중 오류가 발생했습니다.");            
        }
    }



}
