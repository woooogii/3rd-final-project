import React, { useState, memo } from 'react';
import Sidebar from './MyPageSidebar';
import MyPageInfo from './MyPageMyInfo';
import MyPageCheckPw from './MyPageCheckPW';
import MyPageTicketList from './MyPageTicketList';
import MyPageDefault from './MainPageDefault';
import styles from  './MyPageCss.css';
import MainPageDefault from './MainPageDefault';

const MyPageInfoMemo = memo(MyPageInfo);

function MyPage() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = (component) => {
    switch (component) {
      case 'info':
        return <MyPageInfoMemo />;
      case 'checkpwd':
        return <MyPageCheckPw />;
      case 'tickets':
        return <MyPageTicketList />;
      default:
        return <MainPageDefault setActiveComponent={setActiveComponent}/>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}> 
      <Sidebar setActiveComponent={setActiveComponent} classname="sidebar" /> {/* 사이드바 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' , marginTop:70, marginLeft:50, marginRight:70}}> 
      <h1 style={{ textAlign: 'left', cursor: 'pointer',backgroundColor:'#1675F2', width:'fit-content'}} onClick={() => setActiveComponent(null)}>마이페이지</h1>
        <hr/>
        {renderComponent(activeComponent)} {/* 활성화된 컴포넌트 */}
      </div>
    </div>
  );
}

export default MyPage;