import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from './post'; 
import './style/MyPageCss.css';

const MyPageInfo = memo(({ setActiveComponent, tokenType }) => {

  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid;
  const [userInfo, setUserInfo] = useState({
    uid: '',
    uname: '',
    uphone: '',
    uaddress: '',
    uaddrdetail: '',
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!uid) {
        console.error('사용자가 로그인하지 않았습니다.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:4000/pedal/normal`, {
          params: {
            uId: uid // 서버에 전달할 사용자 ID를 파라미터로 설정합니다.
          }
        });
        setUserInfo(prevState => ({ ...prevState, ...response.data })); 
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      }
    };
  
    fetchUserInfo();
  }, [uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddress = (newAddress) => {
    setUserInfo({
      ...userInfo,
      uaddress: newAddress,
    });
    setPopup(false);
  };

  const updateUserInfo = async () => {
    if (!uid) {
      alert('사용자가 로그인하지 않았습니다.');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/pedal/normal`, userInfo);
      alert('사용자 정보가 업데이트 되었습니다.');
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
      alert('정보 업데이트에 실패했습니다.');
    }
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <div className="myPageInfoContainer">
      <div className="myPageInfoBox">
        <h2>내 정보</h2>
        <div className="formGroup">
          <label htmlFor="uid">아이디:</label>
          <input type="text" id="uid" name="uid" value={userInfo.uid || ''} onChange={handleInputChange} placeholder="이메일형식의 아이디를 입력하세요" readOnly />
        </div>
        <div className="formGroup">
          <label htmlFor="uname">이름:</label>
          <input type="text" id="uname" name="uname" value={userInfo.uname || ''} onChange={handleInputChange} placeholder="이름을 입력하세요" readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="uphone">휴대전화:</label>
          <input type="text" id="uphone" name="uphone" value={userInfo.uphone || ''} onChange={handleInputChange} placeholder="휴대폰 번호를 입력하세요" />
        </div>
        <div className="formGroup">
          <label htmlFor="uaddress">주소:</label>
          <input type="text" id="uaddress" name="uaddress" value={userInfo.uaddress || ''} onChange={handleInputChange} placeholder="주소를 입력하세요" readOnly />
          <button className="popupButton" onClick={togglePopup}>우편번호 찾기</button>
        </div>
        {popup && <Post setCompany={handleAddress} />}
        <div className="formGroup">
          <label htmlFor="uaddressdetail">상세주소:</label>
          <input type="text" id="uaddrdetail" name="uaddrdetail" value={userInfo.uaddrdetail || ''} onChange={handleInputChange} placeholder="상세 주소를 입력하세요" />
        </div>
        <div class="btn_info">
          <button type="button" class="btn btn-outline-primary" onClick={() => setActiveComponent('default')}  style={{borderRadius:'20px', fontSize:'17px',paddingLeft:'55px',paddingRight:'55px'}} >취소</button>
          <button type="button" class="btn btn-primary" onClick={updateUserInfo} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;정보 업데이트&nbsp;</button>
        </div>
      </div>
    </div>
  );
});

export default MyPageInfo;