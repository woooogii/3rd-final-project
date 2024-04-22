import React, { useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShopHeader from './ShopHeader';

import '../../../styles/nav/nav.css'
import ProductList from './ProductList';
import AddProduct from './AddProduct';


const Shop = () => {
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

    return (
        <>
            <div ref={startHereRef}>
            <ShopHeader id="#custom-shopHead"/>
            </div>
               
              {(loginUser && loginUser.uid && loginUser.uname) ? (
                    <div>
                        <p>{loginUser.uname}님 안녕하세요</p>
                        <p>접속 아이디: {loginUser.uid}</p>
                    </div>
                    
                ) : (
                    <div>로그인 안돼있음</div>
              )}

            <button onClick={() => { 
                (loginUser && loginUser.uid && loginUser.uname) ? buyItem() : loginFirst();
            }}>구매</button>

            <br/><br/><br/><br/><br/><br/>
            <AddProduct/>
            <ProductList/>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    );
};

export default Shop;