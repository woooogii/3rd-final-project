import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyPageCheckPW = ({ setActiveComponent }) => {
  const [upwd, setUpwd] = useState('');
  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid;



  const handlePasswordChange = (e) => {
    setUpwd(e.target.value);
  };

  const checkPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4000/pedal/check-password', { uid: uid, upwd: upwd });

      if (response.data) {
        setActiveComponent('updatePassword'); // 상태를 업데이트하여 비밀번호 수정 컴포넌트로 전환
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 검증 실패', error);
      alert('서버 오류입니다.');
    }
  };

  return (
    <div style={{padding: 20}}>
      <h2>비밀번호 확인</h2>
      <input type="password" value={upwd} onChange={handlePasswordChange} placeholder="현재 비밀번호 입력" />
      <button onClick={checkPassword}>확인</button>
    </div>
  );
};

export default MyPageCheckPW;