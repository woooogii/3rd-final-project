import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const ImageItem = styled.article`
width:430px; margin-bottom:60px;
border:1px solid #999;
padding:20px 15px 35px;
img{
    width:100px;height:100px; margin-bottom:15px;
    width:100px;height:100px; margin-bottom:15px;
}
h3{
    font-size:25px; color:black; font-weight:600;
    margin-bottom:20px;
}
ul{
    li{
        margin-bottom:5px;
        em{display:inline-block;width:80px;}
    }
}
p{
    margin-top:20px;
    span{margin-right:10px;}
}
`
const ProductItem = ({item}) => {
    const [imageURLs, setImageURLs] = useState([]);
    
    useEffect(()=>{
        getProductImage(item.pid);
    },[]);

    const getProductImage=async(pid)=>{
        try {
            const response = await axios.get(`http://localhost:4000/pedal/product/image/${pid}`);
            // 받은 데이터를 디코딩하여 이미지 URL 리스트에 저장
            const decodedURLs = response.data.map((url) => decodeURIComponent(url));
            setImageURLs(decodedURLs);
            console.log('imageURLs',imageURLs);
        } catch (error) {
            console.error('error_fetch_image', error);
        }
    }

    const navigate = useNavigate('');

    const handleClick = () => {
        const uri = `/pedal/productDetail/${item.pid}`;
        navigate(uri);
    }
    return (
        <ImageItem onClick={handleClick}>
            <div>
                {imageURLs&&imageURLs.map((img,index)=>
                <p key={index}>
                <img src={img} alt={`Product Image ${index}`}/>
                </p>
                )}

            </div>
            <div>
                <h3>상품명: {item.pname}</h3>
                <p>카테고리: {item.pcategory}</p>
                <p>가격: {item.pprice}</p>
            </div>
        </ImageItem>
    );
};

export default ProductItem;