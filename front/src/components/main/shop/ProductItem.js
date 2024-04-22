import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const ImageItem = styled.article`
width:430px; margin-bottom:60px;
border:1px solid #999;
padding:20px 15px 35px;
img{
    width:200px;margin-bottom:15px;
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
    const [imageURL, setImageURL] = useState('');

    useEffect(()=>{
        getProductImage(item.pid);
    },[]);
        const getProductImage=async(pid)=>{
            try {
                const response = await axios.get(`http://localhost:4000/pedal/product/image/${pid}`, {
                    responseType: 'arraybuffer',
                });
                console.log('responseData',response.data);
                const url = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                
                setImageURL(url);
            } catch (error) {
                console.error('error_fetch_image', error);
            }
        }
    console.log('image',imageURL);

    const navigate = useNavigate('');

    const handleClick = () => {
        const uri = `/pedal/productDetail/${item.pid}`;
        navigate(uri);
    }

    return (
        <ImageItem onClick={handleClick}>
            <div>
                <img src={imageURL} alt={item.pname}/>
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