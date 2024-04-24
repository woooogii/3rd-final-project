import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loginToken } from './store';
import { useDispatch } from 'react-redux';
import { BsCart3 } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import '../../styles/nav/nav.css'
import { PiUserCircle } from "react-icons/pi"


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
    }, [cookies.jwtToken,cookies.googleJwtToken]);




      const setUser= () => {

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

      const setGoogleUser= () => {
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
                    // 로그아웃 성공시 그자리에서 새로고침만 
                    navigate(0);
                } else {
                    console.error('로그아웃 요청이 실패했습니다.');
                }
            } catch (error) {
                console.error('로그아웃 요청 중 에러가 발생했습니다.', error);
            }
        };


return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/pedal/home">PEDAL</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pedal/station">대여소</a>
          </li>
          <span style={{marginTop:'22px', fontSize:'20px'}}>ㅣ</span>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pedal/ticket">이용권</a>
          </li>
          <span style={{marginTop:'22px', fontSize:'20px'}}>ㅣ</span>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pedal/shop">쇼핑몰</a>
          </li>
        </ul>
        <span className="navbar-text">
        {token !== null ? (
                        <div className='header_right1'>
                            <div>{uname}님&nbsp;<PiUserCircle style={{fontSize:'30px', marginBottom:'5px'}} /></div>
                                <Nav.Link onClick={() => { handleLogout() }} className='menu-button'>로그아웃</Nav.Link>
                                <Nav.Link href="/pedal/myPage" className='menu-button'>마이페이지</Nav.Link>
                                <BsCart3 style={{fontSize:'24'}} onClick={() => { navigate('/pedal/cart') }} />
                        </div>
                    ) : (
                        
                        <div className='header_right2'>
                            <PiUserCircle style={{fontSize:'30px', marginLeft:'40px', marginBottom:'5px'}} />
                            <Nav.Link href="/pedal/login" className='menu-button'>&nbsp;로그인</Nav.Link>
                            <Nav.Link href="/pedal/join" className='menu-button'>회원가입</Nav.Link>
                        </div>
                    )}
                  
        </span>
      </div>
    </div>
  </nav>
);
};

export default Navibar;