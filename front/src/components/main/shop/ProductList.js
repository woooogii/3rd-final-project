import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import './style/productList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopHeader from './ShopHeader';

const ProductList = () => {
    const [allData, setAllData] = useState(null);
    const startHereRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pedal/shop/list');
                setAllData(response.data);
            } catch (error) {
                console.error('error_fetch', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // 렌더링 후 startHere 요소로 스크롤 이동
        if (startHereRef.current) {
            startHereRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[]);

    return (
        <>
            <div ref={startHereRef}>
            <ShopHeader id="#custom-shopHead"/>
            </div>

            <div className='main'>
                <br/>
                <div className='product'>
                    <h2>전체상품</h2>
                    <select>
                        <option value={""}>신상품순</option>
                        <option value={""}>높은가격순</option>
                        <option value={""}>낮은가격순</option>
                    </select>
                    {/* <Search/> */}
                    <ul>
                        {allData && allData.map(item => 
                            <ProductItem key={item.pid} item={item}/>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ProductList;
