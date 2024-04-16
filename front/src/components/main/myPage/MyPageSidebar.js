import React from 'react';

function MyPageSidebar({ setActiveComponent }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveComponent('info')}>사용자 정보</li>
        <li onClick={() => setActiveComponent('checkpwd')}>비밀번호 변경</li>
        <li onClick={() => setActiveComponent('tickets')}>티켓 구매내역</li>
        <li onClick={() => setActiveComponent('tickets')}>상점 구매내역</li>
        {/* 다른 메뉴 아이템들 */}
      </ul>
    </div>
  );
}

export default MyPageSidebar;