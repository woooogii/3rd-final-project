import React from 'react';

function MyPageSidebar({ setActiveComponent, tokenType }) {
  
  const renderMenu = () => {
    switch (tokenType) {
      case 'googleJwtToken':
        return (
          <ul>
            <h4><b>계정 관리</b></h4>
            <hr/>
            <li onClick={() => setActiveComponent('googleInfo')}>사용자 정보수정</li>
            <br/>
            <h4><b>구매 관리</b></h4>
            <hr/>
            <li onClick={() => setActiveComponent('tickets')}>티켓 구매내역</li>
            <li onClick={() => setActiveComponent('orders')}>상점 구매내역</li>
          </ul>
        );
      case 'jwtToken':
        return (
          <ul>
             {/* 일반 사용자만 메뉴 */}
            <h4><b>개인정보 수정</b></h4>
            <li onClick={() => setActiveComponent('info')}>사용자 정보수정</li>
            <li onClick={() => setActiveComponent('checkpwd')}>비밀번호 변경</li>
            <li onClick={() => setActiveComponent('tickets')}>티켓 구매내역</li>
            <li onClick={() => setActiveComponent('orders')}>상점 구매내역</li>
            

          </ul>
        );
      default:
        return (
          <ul>
            <h4><b>로그인이 필요합니다</b></h4>
            <li>서비스 이용을 위해 로그인 해주세요.</li>
          </ul>
        );
    }
  };

  return (
    <div className="sidebar">
      {renderMenu()}
    </div>
  );
}

export default MyPageSidebar;
