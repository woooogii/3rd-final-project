import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from './post';
import './MyPageCss.css'; 

const MpSnsInfo = ({setActiveComponent}) => {
  
  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid;
  
  const [userInfo, setUserInfo] = useState({
    email: uid, 
    phone: '',
    address: '',
    addrDetail: '' 
  });

  const [popup, setPopup] = useState(false);

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressInput = (newAddress) => {
    setUserInfo({
      ...userInfo,
      address: newAddress
    });
    togglePopup();
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const updateUserInfo = async () => {
    if (!uid) {
      alert('사용자가 로그인하지 않았습니다.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:4000/pedal/google/${uid}`, userInfo);
      if (response.status === 200) {
        alert('사용자 정보가 업데이트 되었습니다.');
      } else {
        alert('정보 업데이트에 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
      alert('정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="myPageInfoContainer">
      <div className="myPageInfoBox">
        <h2>내 정보</h2>
        <div className="formGroup">
          <label>사용자 ID:</label>
          <input type="text" value={userInfo.email} readOnly />
        </div>
        <div className="formGroup">
          <label htmlFor="phone">전화번호:</label>
          <input type="text" id="phone" name="phone" value={userInfo.phone} onChange={handleInputChange} placeholder="전화번호를 입력하세요" />
        </div>
        <div className="formGroup">
          <label htmlFor="address">주소:</label>
          <input type="text" id="address" name="address" value={userInfo.address} onChange={handleInputChange} placeholder="주소를 입력하세요" readOnly />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="popupButton" onClick={togglePopup}>우편번호 찾기</button>
          </div>
        </div>
        {popup && <Post setCompany={handleAddressInput} />}
        <div className="formGroup">
          <label htmlFor="addressDetail">상세주소:</label>
          <input type="text" id="addressDetail" name="addrDetail" value={userInfo.addressDetail} onChange={handleInputChange} placeholder="상세주소를 입력하세요" />
        </div>
        <div className="btn_info">
          <button type="button" className="btn btn-outline-primary" onClick={() => setActiveComponent('defaultComponentName')} style={{ borderRadius: '20px', fontSize: '17px', paddingLeft: '55px', paddingRight: '55px' }}>취소</button>
          <button type="button" className="btn btn-primary" onClick={updateUserInfo} style={{ borderRadius: '20px', fontSize: '17px' }}>&nbsp;정보 업데이트&nbsp;</button>
        </div>
      </div>
    </div>
  );
};

export default MpSnsInfo;


