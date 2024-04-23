import React from 'react';

function MyPageSidebar({ setActiveComponent }) {
  return (
    <div className="sidebar">
      <ul>
        
       
        <h4> <b>개인정보 수정</b></h4>
        <br/>
        <li onClick={() => setActiveComponent('info')}>사용자 정보</li> <br/>
        <li onClick={() => setActiveComponent('checkpwd')}>비밀번호 변경</li>
        <br/>
        <br/>
        <h4> <b>구매내역 조회</b></h4>
        <br/>
        <li onClick={() => setActiveComponent('tickets')}>티켓 구매내역</li> <br/>
        <li onClick={() => setActiveComponent('tickets')}>상점 구매내역</li>
        {/* 다른 메뉴 아이템들 */}
      </ul>
    </div>
  );
}

export default MyPageSidebar;