import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyPageUpdatePW = ({ setActiveComponent }) => {
  const [upwd, setupwd] = useState('');
  const [confirmUpwd, setConfirmUpwd] = useState('');
  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid;

  const handleNewPasswordChange = (e) => {
    setupwd(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmUpwd(e.target.value);
  };

  const updatePassword = async () => {
    if (upwd !== confirmUpwd) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    try {
      await axios.put('http://localhost:4000/pedal/update-password', { uid: uid, upwd: upwd });
      alert('비밀번호가 업데이트되었습니다.');
      setActiveComponent(""); // 비밀번호 업데이트 후 기본 뷰로 전환
    } catch (error) {
      console.error('비밀번호 업데이트 실패', error);
      alert('비밀번호 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="myPageCheckPWContainer">
      <h2>비밀번호 수정</h2>
      <input
        type="password"
        value={upwd}
        onChange={handleNewPasswordChange}
        placeholder="변경하실 비밀번호를 입력하세요"
      />
      <input
        type="password"
        value={confirmUpwd}
        onChange={handleConfirmPasswordChange}
        placeholder="비밀번호를 다시 입력하세요"
      />
      <button onClick={updatePassword}>확인</button>
    </div>
  );
};

export default MyPageUpdatePW;