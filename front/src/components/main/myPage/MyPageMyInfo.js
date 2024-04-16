import React, { useState, useEffect } from 'react';

function MyPageInfo() {
  // 사용자 정보 관련 state
  const [uName, setUName] = useState('');
  const [uPhone, setUPhone] = useState('');
  const [uAddress, setUAddress] = useState('');
  const [uAddrDetail, setUAddrDetail] = useState('');

  // 컴포넌트가 마운트될 때 사용자 정보를 불러오는 함수
  useEffect(() => {
    // API 호출 로직을 추가하여 사용자 정보를 불러오고 상태를 설정합니다.
  }, []);

  // 정보 업데이트 함수
  const updateUserInfo = () => {
    // API 호출 로직을 추가하여 사용자 정보를 업데이트합니다.
  };

  return (
    <div>
      <input type="text" value={uName} onChange={e => setUName(e.target.value)} placeholder="이름" />
      <br/>
      <input type="text" value={uPhone} onChange={e => setUPhone(e.target.value)} placeholder="전화번호" />
      <br/>
      <input type="text" value={uAddress} onChange={e => setUAddress(e.target.value)} placeholder="주소" />
      <br/>
      <input type="text" value={uAddrDetail} onChange={e => setUAddrDetail(e.target.value)} placeholder="상세 주소" />
      <br/>
      <button onClick={updateUserInfo}>정보 업데이트</button>
    </div>
  );
}

export default MyPageInfo;