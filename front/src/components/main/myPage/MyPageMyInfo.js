import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginToken } from '../../nav/store';

const MyPageInfo = memo(() => {
  const loginUser = useSelector(state => state.loginUser);
  const uid = loginUser.uid
  const dispatch = useDispatch();


  const [userInfo, setUserInfo] = useState({
    uid: '',
    uname: '',
    uphone: '',
    uadress: '',
    uadressdetail: '',
  });


  useEffect(() => {
    async function fetchUserInfo() {
     
      if (!loginUser.uid) {
        console.error('사용자가 로그인하지 않았습니다.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:4000/pedal/${uid}`);
        setUserInfo(response.data); 
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      }
    }

    fetchUserInfo();
  }, [uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updateUserInfo = async () => {
    if (!loginUser.uid) {
      alert('사용자가 로그인하지 않았습니다.');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/pedal/${uid}`, userInfo);
      
      alert('사용자 정보가 업데이트 되었습니다.');
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
      alert('정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <div style={{marginLeft:200, marginTop:10}}>
     
      <div style={{backgroundColor:'#008080'}}>
        아이디 : <input type="text" name="uid" value={userInfo.uid || ''} onChange={handleInputChange} placeholder="이메일형식의 아이디를 입력하세요" /><br/>
        이 름: <input type="text" name="uname" value={userInfo.uname || ''} onChange={handleInputChange} placeholder="이름을 입력하세요" /> <br/>
        휴대전화 : <input type="text" name="uphone" value={userInfo.uphone || ''} onChange={handleInputChange} placeholder="휴대폰 번호를 입력하세요" /><br/>
        주소 : <input type="text" name="uaddress" value={userInfo.uaddress || ''} onChange={handleInputChange} placeholder="주소를 입력하세요" /><br/>
        상세주소 : <input type="text" name="uaddrdetail" value={userInfo.uaddrdetail || ''} onChange={handleInputChange} placeholder="상세 주소를 입력하세요" /><br/>
        <button onClick={updateUserInfo}>정보 업데이트</button>
      </div>
    </div>
  );
});

export default MyPageInfo;