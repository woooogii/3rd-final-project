import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import MyPageSidebar from './MyPageSidebar';
import MyPageInfo from './MyPageMyInfo';
import MyPageCheckPW from './MyPageCheckPW';
import MyPageTicketList from './MyPageTicketList';
import MainPageDefault from './MainPageDefault';
import MyPageUpdatePW from './MyPageUpdatePW';
import MpSnsInfo from './MpSnsInfo';
import styled from 'styled-components';
import MyPageOrders from './MyPageOrders';
import PedalFAQMain from '../faq/PedalFAQMain';

const MyPageMainHead = styled.div`

    .myPageMainHead {
            position: absolute;
            font-size: 18px;
            font-weight: bold;
            top: 110px;
            left: 380px;

            hr {
                position: absolute;
                border: 10px solid #1675f2;
                width: 180px;
                margin-left: -10px;
                top: 10px;
            }
        }
`;

const MyPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [tokenType, setTokenType] = useState(null);  // 로그인 타입 ('jwtToken', 'googleJwtToken', null)
  const [cookies] = useCookies(['jwtToken', 'googleJwtToken']); // 쿠키 이름을 배열로 전달

  useEffect(() => {
    if (cookies.jwtToken) {
      decodeToken(cookies.jwtToken, 'standard');
    } else if (cookies.googleJwtToken) {
      decodeToken(cookies.googleJwtToken, 'google');
    } else {
      setTokenType(null);
    }
  }, [cookies.jwtToken, cookies.googleJwtToken]);

  const decodeToken = (token, provider) => {
    try {
      const decoded = jwtDecode(token);
      setTokenType(provider === 'google' ? 'googleJwtToken' : 'jwtToken');
    } catch (error) {
      console.error(`${provider} token decoding failed:`, error);
      setTokenType(null);
    }
  };

  const renderComponent = (component) => {
    switch (component) {
      case 'info':
        return <MyPageInfo setActiveComponent={setActiveComponent}/>;
      case 'checkpwd':
        return <MyPageCheckPW setActiveComponent={setActiveComponent} />;
      case 'tickets':
        return <MyPageTicketList />;
      case 'orders':
        return <MyPageOrders />;
      case 'updatePassword':
        return <MyPageUpdatePW setActiveComponent={setActiveComponent} />;
      case 'googleInfo':
        return <MpSnsInfo setActiveComponent={setActiveComponent} />;
      case 'faq':
        return <PedalFAQMain setActiveComponent={setActiveComponent}/>
        default:
        return <MainPageDefault setActiveComponent={setActiveComponent} tokenType={tokenType}/>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <MyPageSidebar 
        setActiveComponent={setActiveComponent} 
        tokenType={tokenType}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 70, marginLeft: 50, marginRight: 70 }}>
      <MyPageMainHead>
        <div className='myPageMainHead'>
          <hr />
          <h2 style={{ textAlign: 'left', cursor: 'pointer', width: 'fit-content' }} onClick={() => setActiveComponent(null)}>마이페이지</h2>
          </div>
      </MyPageMainHead>

        <hr />
        {renderComponent(activeComponent)}
        
      </div>
    </div>
  );
};

export default MyPage;