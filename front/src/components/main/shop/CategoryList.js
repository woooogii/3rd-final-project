import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/productList.css';
import ProductItem from './ProductItem';
import ShopHead from './ShopHead';
import ShopHeader from './ShopHeader';
import Pagination from '@mui/material/Pagination';
import AddProduct from './AddProduct';
//import Pagination from "react-js-pagination";

const CategoryList = () => {
    const [cateData, setCateData] = useState([]);
    const { category } = useParams();
    const [reloadProducts, setReloadProducts] = useState(false);
    
    const startHereRef = useRef(null);
    useEffect(() => {
        // 렌더링 후 startHere 요소로 스크롤 이동
        if (startHereRef.current) {
            startHereRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(category);
                const response = await axios.get(`http://localhost:4000/pedal/shop/list/${category}`);
                setCateData(response.data);
            } catch (error) {
                console.error('error_fetch', error);
            }
        };
        fetchData();
    }, [category, reloadProducts]);

    const handleProductAdded = () => {
        // 상품이 추가되면 상태를 업데이트하여 상품 목록을 다시 로드함
        console.log("상품 재로드 실행")
        setReloadProducts(prev => !prev);
    };

    //select 순서 정렬
    const [sortOrder, setSortOrder] = useState("noFilter");
    
    const sortData = (data, order) => {
        if (!data) return [];
        const selectData = [...data];
        if (order === "newProduct") {
            return selectData.sort((a, b) => new Date(b.pregdate) - new Date(a.pregdate));
        } else if (order === "highPrice") {
            return selectData.sort((a, b) => b.pprice - a.pprice);
        } else if (order === "lowPrice") {
            return selectData.sort((a, b) => a.pprice - b.pprice);
        } else {
            return selectData;
        }
    };
    const handleChangeSelect=(e)=>{
        const selectedValue = e.target.value;
        setSortOrder(selectedValue);
    }
    const sortedData = sortData(cateData, sortOrder);
    //페이징
    const [currPage, setCurrPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(8);
    const lastPostIndex = currPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =sortedData.slice(firstPostIndex,lastPostIndex);


    return (
        <>
            <div ref={startHereRef}>
            <ShopHead id="head"/>
            <ShopHeader/>
            </div>
            <div className='main'>
                <br/>
                <div className='product'>
                    {category==='bicycle'?
                    (<h2>자전거</h2>):(<h2>안전용품</h2>)}
                    <select onChange={handleChangeSelect}>
                            <option value={'noFilter'}>정렬방법</option>
                            <option value={"newProduct"}>신상품순</option>
                            <option value={"highPrice"}>높은가격순</option>
                            <option value={"lowPrice"}>낮은가격순</option>
                    </select>
                    <AddProduct onProductAdded={handleProductAdded} />
                    <ul>
                        {sortedData && sortedData.map(item =>
                            <ProductItem key={item.pid} item={item} currentPosts={currentPosts}/>
                        )}
                    </ul>
                </div>

                <Pagination shape="rounded" style={{marginLeft:'45%'}}/>
            </div>
        </>
    );
};

export default CategoryList;