import React from 'react';

function MyPageSidebar({ setActiveComponent, tokenType }) {
  // 로그인 타입에 따라 다른 메뉴 렌더링
  const renderMenu = () => {
    switch (tokenType) {
      case 'googleJwtToken':
        return (
          <ul>
            <h4><b>Google 계정 관리</b></h4>
            <li onClick={() => setActiveComponent('googleInfo')}>Google 프로필</li>
            <li onClick={() => setActiveComponent('googleSecurity')}>Google 보안 설정</li>
            <li onClick={() => setActiveComponent('googleDrive')}>Google 드라이브</li> // 구글 사용자만 접근 가능한 추가 메뉴
          </ul>
        );
      case 'jwtToken':
        return (
          <ul>
            <h4><b>개인정보 수정</b></h4>
            <li onClick={() => setActiveComponent('info')}>사용자 정보</li>
            <li onClick={() => setActiveComponent('checkpwd')}>비밀번호 변경</li>
            <li onClick={() => setActiveComponent('tickets')}>티켓 구매내역</li>
            <li onClick={() => setActiveComponent('store')}>상점 구매내역</li>
            <li onClick={() => setActiveComponent('standardReports')}>보고서</li> // 일반 사용자만 접근 가능한 추가 메뉴
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
