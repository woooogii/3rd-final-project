import React, { useState } from 'react';
import Sidebar from './MyPageSidebar';
import MyPageInfo from './MyPageMyInfo';
import MyPageCheckPw from './MyPageCheckPW';
import MyPageTicketList from './MyPageTicketList';

function MyPage() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = (component) => {
    switch (component) {
      case 'info':
        return <MyPageInfo />;
      case 'checkpwd':
        return <MyPageCheckPw />;
      case 'tickets':
        return <MyPageTicketList />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div style={{ flex: 1 }}>
        {renderComponent(activeComponent)}
      </div>
    </div>
  );
}

export default MyPage;