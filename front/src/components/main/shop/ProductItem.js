import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style/productList.css';

const ProductItem = ({item}) => {
    // const [imageURLs, setImageURLs] = useState([]);
    
    // useEffect(()=>{
    //     getProductImage(item.pid);
    // },[]);

    // const getProductImage=async(pid)=>{
    //     try {
    //         const response = await axios.get(`http://localhost:4000/pedal/shop/image/${pid}`, { cache: false });
    //         // 받은 데이터를 디코딩하여 이미지 URL 리스트에 저장
    //         const decodedURLs = response.data.map((url) => decodeURIComponent(url));
    //         setImageURLs(decodedURLs);
    //     } catch (error) {
    //         console.error('error_fetch_image', error);
    //     }
    // }
    console.log(item);

    const navigate = useNavigate('');

    const handleClick = () => {
        const uri = `/pedal/productDetail/${item.pid}`;
        navigate(uri);
    }
    return (
        
        <li onClick={handleClick}>
            
            <Link to={`/ProductDetail/${item.pid}`}>
            <img src={item.pimage1} alt='pimage1'/>
            <img src={item.pimage2} alt='pimage2'/>
            <img src={item.pimage3} alt='pimage3'/>
            <img src={item.pimage4}alt='pimage4'/>
            </Link>
                <h3>{item.pname}</h3>
                <p>{item.pprice}원</p>
                <p>간단한 설명입니다.</p>
        </li>
    );
};

export default ProductItem;