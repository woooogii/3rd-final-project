import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from './post';
import './style/MyPageCss.css';

const MpSnsInfo = ({setActiveComponent}) => {
  
  const loginUser = useSelector(state => state.loginUser);
  const email = loginUser?.uid || '';
  
  const [socialDTO, setSocialDTO] = useState({
    email: email, 
    phone: '',
    address: '',
    addrDetail: '' 
  });

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!email) {
        console.error('사용자가 로그인하지 않았습니다.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/pedal/google2', {
          params: {
            email: email // 서버에 전달할 사용자 email를 파라미터로 설정합니다.
          }
        });
        setSocialDTO(prevState => ({ ...prevState, ...response.data }));
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [email]);

  const handleInputChange = (e) => {
    setSocialDTO({
      ...socialDTO,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressInput = (newAddress) => {
    setSocialDTO({
      ...socialDTO,
      address: newAddress
    });
    togglePopup();
  };

  const togglePopup = () => {
    setPopup(!popup);
  };




  const updateSocialInfo = async () => {
    if (!email) {
      alert('사용자가 로그인하지 않았습니다.');
      return;
    }
    try {
      const response = await axios.put('http://localhost:4000/pedal/googleupdate', socialDTO);
      console.log(socialDTO.email)
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
          <input type="text" value={socialDTO.email} readOnly />
        </div>
        <div className="formGroup">
          <label htmlFor="phone">전화번호:</label>
          <input type="text" id="phone" name="phone" value={socialDTO.phone} onChange={handleInputChange} placeholder="전화번호를 입력하세요" />
        </div>
        <div className="formGroup">
          <label htmlFor="address">주소:</label>
          <input type="text" id="address" name="address" value={socialDTO.address} onChange={handleInputChange} placeholder="주소를 입력하세요" readOnly />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="popupButton" onClick={togglePopup}>우편번호 찾기</button>
          </div>
        </div>
        {popup && <Post setCompany={handleAddressInput} />}
        <div className="formGroup">
          <label htmlFor="addrDetail">상세주소:</label>
          <input type="text" id="addrDetail" name="addrDetail" value={socialDTO.addrDetail} onChange={handleInputChange} placeholder="상세주소를 입력하세요" />
        </div>
        <div className="btn_info">
          <button type="button" className="btn btn-outline-primary" onClick={() => setActiveComponent('defaultComponentName')} style={{ borderRadius: '20px', fontSize: '17px', paddingLeft: '55px', paddingRight: '55px' }}>취소</button>
          <button type="button" className="btn btn-primary" onClick={updateSocialInfo} style={{ borderRadius: '20px', fontSize: '17px' }}>&nbsp;정보 업데이트&nbsp;</button>
        </div>
      </div>
    </div>
  );
};

export default MpSnsInfo;


