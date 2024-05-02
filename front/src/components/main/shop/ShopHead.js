import React, { useRef,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { loginToken } from '../../nav/store';
import { useDispatch } from 'react-redux';
import '../shop/ShopHead.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCart2 } from "react-icons/bs";
import { PiList } from "react-icons/pi";
import { BsExclamationLg } from "react-icons/bs";



const ShopHead = () => {

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


    const onBuy = () => {
        if(token === null){
            alert("로그인이 필요합니다.")
            navigate('/pedal/login');
        }else{
            navigate('/pedal/cart');
        }
    };

/////////////검색
const [searchValue, setSearchValue] = useState('');
const onSearch = () => {
    if (searchValue) {
      navigate(`/pedal/shop/search?searchValue=${encodeURIComponent(searchValue)}`);
    }
};
useEffect(()=>{
    onSearch();
},[]);


//후석추가 

const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);


  const handleScroll = () => {
    const headerTop = navRef.current.offsetTop;  // 헤더의 최상단 위치
    const scrolled = window.scrollY;  // 현재 스크롤된 양

    if (scrolled > headerTop) {
      setIsSticky(true);  // 스크롤 위치가 헤더 위치보다 아래일 때
    } else {
      setIsSticky(false);  // 그 외의 경우
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

return (
  <div ref={navRef} className={`sticky-container ${isSticky ? 'sticky' : ''}`}>
    {/* Navigation bar setup */}
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid" style={{ backgroundColor: '#1675F2', height: '90px', marginTop: '12px' }}>
                  {/* 로고 */}
                  <a class="navbar-brand" href="/pedal/home" style={{ marginLeft: '50px' }}>
                      <PiList style={{ marginRight: '90px', fontSize:'40px' }} />
                      PEDAL +
                  </a>
                  <br />
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarText">
                      <ul className='shop_navbar' class="navbar-nav me-auto mb-2 mb-lg-0" style={{ width: '240px', display: 'flex', justifyContent: 'space-between', marginLeft: '-15px' }}>
                          <li className='shop_item'  class="nav-item">
                              <a class="nav-link active" aria-current="page" href="/pedal/shop/list/bicycle" style={{ color: '#fff', marginBottom: '15px' }}>
                                  자전거
                              </a>
                          </li>
                          <span style={{ marginTop: '8px', fontSize: '20px', color: '#fff' }}>ㅣ</span>
                          <li class="nav-item">
                              <a class="nav-link active" aria-current="page" href="/pedal/shop/list/equipments" style={{ color: '#fff' }}>
                                  안전용품
                              </a>
                          </li>
                      </ul>
                      <span class="navbar-text">
                          
                              <div class="header_right2">
                                  <div style={{ display: 'flex' }}>
                                      <form onSubmit={(evt) => { evt.preventDefault()}}
                                      className="d-flex" role="search" style={{ marginRight: '50px', position: 'relative' }}>
                                          <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
                                          className="form-control me-2" type="search" placeholder=" ✨오늘의 특가!!" aria-label="Search" />
                                          <button onClick={onSearch}
                                              type="button"
                                              className="btn btn-outline-primary"
                                              style={{
                                                  position: 'absolute',
                                                  right: '20px',
                                                  top: '0',
                                                  bottom: '0',
                                                  margin: 'auto',
                                                  border: 'none',
                                                  fontSize: '13px',
                                                  backgroundColor: 'transparent',
                                                  color: '#1675F2',
                                              }}
                                          >
                                              검색
                                          </button>
                                      </form>
                                    <BsCart2 onClick={onBuy} style={{ color: '#fff', fontSize: '37px' }} />
                                    <div onClick={() => navigate('/pedal/shop/created')}>
                                      <BsExclamationLg style={{ color: '#fff', fontSize: '30px' }} />
                                    </div>
                                  </div>
                              </div>
                      </span>
                  </div>
              </div>
          </nav>
      </div>
  );
};

export default ShopHead;