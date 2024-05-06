import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ShopHead from './ShopHead';

import '../../../styles/nav/nav.css'
import './style/mainList.css';
import { PiBicycle } from "react-icons/pi";
import { FaHelmetSafety,FaTreeCity } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa";
import Carousel from 'react-material-ui-carousel';


const Shop = () => {
    const [entities, setEntities] = useState(null);
    const navigate = useNavigate()
    const startHereRef = useRef(null);
    let loginUser = useSelector((state)=>{ return state.loginUser }) 

    useEffect(() => {
        // 렌더링 후 startHere 요소로 스크롤 이동
        if (startHereRef.current) {
            startHereRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[]);

    const buyItem = () => {
        alert("구매하기 실행 코드 입력")
    }

    const loginFirst = () => {
        navigate('/pedal/login')
    }

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/shop');
            setEntities(response.data);
        } catch (error) {
            console.error('error_fetch', error);   
        }
    };

    
    return (
        <>
            <div ref={startHereRef}>
            <ShopHead id="head"/>
            </div>

            <div className="main" >
                <div className='main-banner'>
                    <Carousel animationDuration={2000} easing="linear" animation="slide">
                        <div><img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/bc7fedade3152601bdef9dde13ba0bef.jpg' alt=''/></div>
                        <div><img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/a2b9341e656104080ff9dc1fa52be6c2.jpg' alt=''/></div>
                        <div><img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/356b10ce637b174d04609f1781d0f8be.jpg' alt=''/></div>
                    </Carousel>
                </div>

                <div className='container_wrap'>
                    <div className='inner'>
                        <h3>Find Your Style</h3>
                            <ul className='lst_bicycle'>
                                <li className='lst_category'>
                                    <img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/e7863614aa9dc7decc60ea3f6430d354.jpg' alt='product'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><PiBicycle/></span>
                                        <strong>시티</strong>
                                        <p>
                                            일상의 이동에서 주말의 레저 활동까지,<br/>
                                            폭넓게 즐길 수 있는 라이프스타일 자전거
                                        </p>
                                        <a href='/pedal/shop/list/bicycle'>VIEW MORE</a>
                                        <div className='bg_box'></div>
                                    </div>
                                </li>
                                <li className='lst_category'>
                                    <img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/534ff4bde7b9f10dd52f2b06a3cd919d.jpg' alt='product'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><FaTreeCity/></span>
                                        <strong>컴포트</strong>
                                        <p>
                                            도심의 불규칙한 노면도 편안하게<br/>
                                            주행할 수 있는 MTB 스타일의 자전거
                                        </p>
                                        <a href='/pedal/shop/list/equipments' target='_self'>VIEW MORE</a>
                                        <div className='bg_box'></div>
                                    </div>
                                </li>
                                <li className='lst_category'>
                                    <img src='	https://www.samchuly.co.kr/file_zone/banner_files/pc/c7785a4e83533250420965c9e38064e2.jpg' alt='product'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><FaRoad/></span>
                                        <strong>로드</strong>
                                        <p>
                                            포장 도로에서 더 빠른 속도로,<br/>
                                            더 멀리 달리기 위한 스포츠 자전거
                                        </p>
                                        <a href='/pedal/shop/list/equipments'>VIEW MORE</a>
                                        <div className='bg_box'></div>
                                    </div>
                                </li>
                            </ul>
                    </div>
                </div>  
            </div>        
        </>
    );
};

export default Shop;