import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/productList.css';
import ProductItem from './ProductItem';
import ShopHead from './ShopHead';
import Pagination from 'react-js-pagination';

const CategoryList = () => {
    const [cateData, setCateData] = useState([]);
    const { category } = useParams();
     
    //ShopHead - 상태기억
    const startHereRef = useRef(null);

    useEffect(() => {
        // 렌더링 후 startHere 요소로 스크롤 이동
        if (startHereRef.current) {
            startHereRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[cateData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/pedal/shop/list/${category}`);
                setCateData(response.data);
            } catch (error) {
                console.error('error_fetch', error);
            }
        };
        fetchData();
    }, [category]);

     // 페이징
     const [page, setPage] = useState(1);
     const postPerPage = 6; // 페이지당 상품 갯수
     const indexOfLastPost = page * postPerPage;
     const indexOfFirstPost = indexOfLastPost - postPerPage;
     const [currentPost, setCurrentPost] = useState([]);
 
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
 
     const handleSort = (sortOption) => {
         const sortedData = sortData(cateData, sortOption);
         setCurrentPost(sortedData.slice(indexOfFirstPost, indexOfLastPost));
     };
 
     useEffect(() => {
        handleSort();
     }, [cateData, page, indexOfFirstPost, indexOfLastPost]);
 
     const handlePageChange = (page) => {
         setPage(page);
     };
    return (
        <>
                <div ref={startHereRef} >
                    <ShopHead id="head"/>
                </div>
                
            <div className='prodt_container'>
                <div className='sub_conts'>
                    {category==='bicycle'?(<h3>자전거</h3>):(<h3>안전용품</h3>)}
                    <div className='prodt_area'>
                        <ul className='cost_order'>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSort('newProduct'); }}>신상품순</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSort('highPrice'); }}>높은가격순</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSort('lowPrice'); }}>낮은가격순</a>
                        </li>
                        </ul>
                        <ul className='prodt_lst'>
                            {currentPost && currentPost.map(item =>
                                <ProductItem key={item.pid} item={item}/>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <Pagination
            activePage={page}
            itemsCountPerPage={postPerPage}
            totalItemsCount={cateData.length}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
            />
        </>
    );
};

export default CategoryList;