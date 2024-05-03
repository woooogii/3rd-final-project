import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Numeral from 'numeral';

import ShopHead from './ShopHead';

import '../../../styles/nav/nav.css'
import './style/mainList.css';
import { PiBicycle } from "react-icons/pi";
import { FaHelmetSafety } from "react-icons/fa6";
import { IoShirtOutline } from "react-icons/io5";
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
                        <h3>product</h3>
                            <ul className='lst_bicycle'>
                                <li className='lst_category'>
                                    <img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/28ba4178b6271a138f8dc853f2a64a01.jpg' alt='product'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><PiBicycle/></span>
                                        <strong>자전거</strong>
                                        <p>
                                            "설명"
                                        </p>
                                        <a href='/pedal/shop/list/bicycle'>VIEW MORE</a>
                                        <div className='bg_box'></div>
                                    </div>
                                </li>
                                <li className='lst_category'>
                                    <img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/c7785a4e83533250420965c9e38064e2.jpg'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><FaHelmetSafety/></span>
                                        <strong>안전 용품</strong>
                                        <p>
                                            안전 용품
                                        </p>
                                        <a href='/pedal/shop/list/equipments' target='_self'>VIEW MORE</a>
                                        <div className='bg_box'></div>
                                    </div>
                                </li>
                                <li className='lst_category'>
                                    <img src='https://www.samchuly.co.kr/file_zone/banner_files/pc/1cedada68c4046266f2264af77410dee.jpg' alt='product'/>
                                    <div className='lst_category_title'>
                                        <span className='lst_icon_hovr'><IoShirtOutline/></span>
                                        <strong>상의</strong>
                                        <p>
                                            "설명"
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