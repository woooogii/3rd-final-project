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
                        <ProductItem item={item}/>
                    </ul>
                ))
            }
        </div>
    );
};

export default ProductList;