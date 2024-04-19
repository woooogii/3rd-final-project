import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';

const ProductList = () => {
    const [entities,setEntities] = useState();
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async()=>{
        try {
            const response = await axios.get('http://localhost:4000/pedal/product/list');
            console.log('꺼내옴',response.data);
            setEntities(response.data);
        } catch (error) {
            console.error('error_fetch',error);   
        }
    }
    const readImg=()=>{

    }
    return (
        <div>
            {
                entities && entities.map(item=>(
                    <ul key={item.pid}>
                         <li>
                            <p>item.상품명: {item.pname}</p>
                            <p>item.카테고리: {item.pcategory}</p>
                            <p>item.가격: {item.pprice}</p>
                            <p>item.이미지: 
                                <img src={item.pid} alt="image from spring"/></p>
                            <p>item.상세설명: {item.pdescription}</p>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
};

export default ProductList;