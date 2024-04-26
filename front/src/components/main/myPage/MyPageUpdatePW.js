import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyPageUpdatePW = ({ setActiveComponent }) => {
  const [upwd, setupwd] = useState('');
  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid;
  console.log(uid)

  const handleNewPasswordChange = (e) => {
    setupwd(e.target.value);
  };

  const updatePassword = async () => {
    try {
      await axios.put('http://localhost:4000/pedal/update-password', { uid: uid, upwd: upwd });
      alert('비밀번호가 업데이트되었습니다.');
      console.log(uid)
      setActiveComponent(""); // 비밀번호 업데이트 후 기본 뷰로 전환
    } catch (error) {
      console.error('비밀번호 업데이트 실패', error);
      alert('비밀번호 업데이트에 실패했습니다.');
    }
  };

  return (
    <div style={{padding: 20}}>
      <h2>비밀번호 수정</h2>
      <input type="password" value={upwd} onChange={handleNewPasswordChange} placeholder="새 비밀번호 입력" />
      <button onClick={updatePassword}>비밀번호 변경</button>
    </div>
  );
};

export default MyPageUpdatePW;