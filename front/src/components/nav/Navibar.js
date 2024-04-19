import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loginToken } from './store';
import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/nav/nav.css'


const Navibar = () => {

    const dispatch = useDispatch();
    const [cookies] = useCookies();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [uid, setUid] = useState('');
    const [uname, setUname] = useState('');


    useEffect(() => {
        if (cookies.jwtToken) {
            setUser();
        }
    }, [cookies.jwtToken]);

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
        <Navbar expand="lg" className="bg-body-tertiary" id="custom-bg-body">
            <Container>
                <Navbar.Brand href="/pedal/home" className='menu-button' style={{color:'#1675F2',fontWeight:'bold',fontSize:'35px', paddingLeft:'85px'}}>PEDAL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto">
                    <Nav.Link className='menu-button' id='custom-button' onClick={()=>{navigate('/pedal/station')}}>대여소</Nav.Link>
                    <Nav.Link className='menu-button' id='custom-button' onClick={()=>{navigate('/pedal/ticket')}}>이용권</Nav.Link>
                    <Nav.Link className='menu-button' id='custom-button' onClick={()=>{navigate('/pedal/shop')}}>쇼핑몰</Nav.Link>

                    {token!==null ? (
                        <div>
                            <li>{uname}님 안녕하세요</li>
                            <li>
                                <button className="menu-button" onClick={()=>{handleLogout()}}>로그아웃</button>
                                <button className="menu-button" onClick={()=>{navigate('/pedal/myPage')}}>마이페이지</button>
                            </li>
                        </div>

                    ) : (

                        <div>
                            <Nav.Link href="/pedal/login" className='menu-button'>로그인</Nav.Link>
                            <Nav.Link href="/pedal/join" className='menu-button'>회원가입</Nav.Link>
                        </div>
                        
                    )}
                
                </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
    );
};

export default Navibar;