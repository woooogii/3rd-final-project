import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loginToken } from './store';
import { useDispatch } from 'react-redux';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/nav/nav.css'
import { PiUserCirclePlusThin,PiUserListThin  } from "react-icons/pi";


const Navibar = () => {

  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [uid, setUid] = useState('');
  const [uname, setUname] = useState('');


  useEffect(() => {
    if (cookies.jwtToken) {
      console.log("걍 토큰 있네")
      setUser();
    } else if (cookies.googleJwtToken) {
      console.log("구글 토큰 있네")
      setGoogleUser();
    }
  }, [cookies.jwtToken, cookies.googleJwtToken]);




  const setUser = () => {

    let token;
    let decodedToken;
    try {
      const token = cookies.jwtToken; //쿠키에서 토큰 빼오기
      decodedToken = jwtDecode(token); //가져온 토큰 디코딩
    } catch (error) {
      console.log(error)
    }

    const uid = decodedToken.sub; //디코딩된 토큰 속 uid
    const uname = decodedToken.nickname; //디코딩된 토큰 속 uname

    setToken(token);
    setUid(uid);
    setUname(uname);

    dispatch(loginToken({ uid: uid, uname: uname })); //store.js로 uid,uname보내주기
  }

  const setGoogleUser = () => {
    let decodedToken;
    try {
      const token = cookies.googleJwtToken; // 쿠키에서 토큰 빼오기
      decodedToken = jwtDecode(token); // 가져온 토큰 디코딩
      const uid = decodedToken.email; // 디코딩된 토큰 속 uid
      const uname = decodedToken.sub; // 디코딩된 토큰 속 uname

      setToken(token);
      setUid(uid);
      setUname(uname);

      dispatch(loginToken({ uid: uid, uname: uname })); // store.js로 uid, uname 보내주기
    } catch (error) {
      console.log(error)
    }
  }


  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:4000/pedal/logout', { withCredentials: true });
      if (response.status === 200) {
        //서버에서 쿠키삭제하고나면 토큰,uid,uname 다 비움 
        setToken(null);
        setUid('');
        setUname('');
        navigate("/pedal/home");
      } else {
        console.error('로그아웃 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('로그아웃 요청 중 에러가 발생했습니다.', error);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:4000/pedal/googleLogout', { withCredentials: true });
      if (response.status === 200) {
        //서버에서 쿠키삭제하고나면 토큰,uid,uname 다 비움 
        setToken(null);
        setUid('');
        setUname('');
        navigate("/pedal/home");
      } else {
        console.error('로그아웃 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('로그아웃 요청 중 에러가 발생했습니다.', error);
    }
  };






  return (
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{height:'80px'}}>
      
      <div class="container-fluid">

        {/* 로고 */}
        {/* <a class="navbar-brand" href="/pedal/home">PEDAL</a> */}
        <a class="logo" href="/pedal/home"><img src='/image/logo03.png' alt='' style={{width:'210px'}}/></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pedal/station">대여소</a>
            </li>
            <span style={{ marginTop: '8px', fontSize: '20px' }}>ㅣ</span>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pedal/ticket">이용권</a>
            </li>
            <span style={{ marginTop: '8px', fontSize: '20px' }}>ㅣ</span>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/pedal/shop">쇼핑몰</a>
            </li>
          </ul>
          <span class="navbar-text">
          
            {token !== null ? (
             
             <div class='header_right1' style={{width:'620px', paddingRight: '120px'}}>
               
                <div style={{fontSize:'18px', paddingTop:'16px',color:'#1675F2'}}><b>{uname}</b>님&nbsp;</div>
                <div style={{color:'#1675F2'}}>
                  <PiUserCirclePlusThin style={{ fontSize: '45px', marginTop:'5px'}} onClick={() => navigate('/pedal/myPage')} />
                </div>

                <button type="button" id='btn' class="btn btn-outline-primary" onClick={() => navigate('/pedal/myPage')}  style={{borderRadius:'20px', fontSize:'15px'}} >&nbsp;마이페이지&nbsp;</button> 

                {
                  cookies.jwtToken ? (
                    <button type="button" id='btn'  class="btn btn-primary" onClick={() => { handleLogout() }}  style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;로그아웃&nbsp;</button>
                  ) : (
                    <button type="button" id='btn'  class="btn btn-primary" onClick={() => { handleGoogleLogout() }}  style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;로그아웃&nbsp;</button>
                  )
                }
               
              </div>
            ) : (

              <div class='header_right2'>
               
                <PiUserCirclePlusThin style={{ fontSize: '45px', marginTop:'5px',marginRight:'-9px'}} onClick={() => navigate('/pedal/login')} />
               
                <div>
                  <button type="button" id='btn' class="btn btn-outline-primary" onClick={() => navigate('/pedal/login')}  style={{borderRadius:'20px', fontSize:'17px',}} >&nbsp;&nbsp; 로그인 &nbsp;&nbsp;</button>
                  <button type="button" id='btn'  class="btn btn-primary"onClick={() => navigate('/pedal/join')}  style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;회원가입&nbsp;</button>
                </div>

              </div>
            )}

          </span>
        </div>
      </div>
    </nav>
    {/* <hr class='line' style={{width:'80vw',marginLeft:'170px'}}/> */}
  </div>
  );
};

export default Navibar;