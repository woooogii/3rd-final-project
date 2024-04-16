import React, { useState } from 'react';
import axios from 'axios';

function MyPageCheckPw({ history }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkPassword = async () => {
    try {
      // 비밀번호 확인 API를 호출
      const response = await axios.post('/api/check-password', { password });

      // 서버에서 비밀번호 일치 여부를 검사한 후, 결과를 받음
      if (response.data.isPasswordCorrect) {
        // 비밀번호가 맞다면, 비밀번호 변경 페이지로 이동
        history.push('/mypagemain/update-password');
      } else {
        // 비밀번호가 틀릴 경우, 에러 메시지 설정
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>비밀번호 확인</h1>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="현재 비밀번호 입력"
      />
      <button onClick={checkPassword}>확인</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default MyPageCheckPw;
