import React, { useState, useEffect } from 'react';

function MyPageTicketList() {
  // 구매한 티켓 목록을 state로 관리
  const [tickets, setTickets] = useState([]);

  // 티켓 정보를 불러오는 함수
  useEffect(() => {
    // TODO: API를 호출하여 사용자의 티켓 구매내역을 가져오고 state를 업데이트합니다.
  }, []);

  return (
    <div>
      <h1>구매한 티켓 목록</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.mtId}>
            {/* 각 티켓의 정보를 표시합니다. */}
            <div>티켓 번호: {ticket.mtId}</div>
            <div>이용 종료 시간: {ticket.mtEndtime}</div>
            <div>이용 여부: {ticket.myStatus ? '이용 중' : '이용 완료'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPageTicketList;