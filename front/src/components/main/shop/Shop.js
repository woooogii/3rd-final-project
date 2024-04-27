import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ShopHead from './ShopHead';

import '../../../styles/nav/nav.css'
import './style/mainList.css';
import AddProduct from './AddProduct';
import ProductItem from './ProductItem';
//import ShopHeader from './ShopHeader';


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
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pedal/shop');
                setEntities(response.data);
            } catch (error) {
                console.error('error_fetch', error);   
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div ref={startHereRef}>
            {/* <ShopHeader id="#custom-shopHead"/> */}
            <ShopHead id="head"/>
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
            

            <div className='main'>
                <div className='visual'>
                    <img src ="/bennerImage/main11.jpg" alt="배너이미지1"/> 
                </div>
                <div className='product'>
                    <h2>상품</h2>
                    <ul>
                        {entities && entities.map(item => 
                            <ProductItem key={item.pid} item={item}/>
                        )}
                    </ul>
                </div>
            </div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        
        </>
    );
};

export default Shop;