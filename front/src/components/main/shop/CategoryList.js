import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/productList.css';
import ProductItem from './ProductItem';

const CategoryList = () => {
    const [cateData, setCateData] = useState(null);
    const { category } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(category);
                const response = await axios.get(`http://localhost:4000/pedal/shop/list/${category}`);
                setCateData(response.data);
                console.log(cateData);
            } catch (error) {
                console.error('error_fetch', error);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className='main'>
            <br/>
            <div className='product'>
                <h2>전체상품</h2>
                <select>
                        <option value={""}>신상품순</option>
                        <option value={""}>높은가격순</option>
                        <option value={""}>낮은가격순</option>
                </select>
                <ul>
                    {cateData && cateData.map(item => 
                        <ProductItem key={item.pid} item={item}/>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CategoryList;