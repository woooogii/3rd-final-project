import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import './style/likes.css';
import { FaStar } from "react-icons/fa";

const Likesdata = ({onCloseLike,uid,handleClick}) => {
    const [likes,setLikes] = useState([]);
    console.log('like_uid',uid)

    useEffect(()=>{
        fetchData(uid);
    },[uid]);
    
    const fetchData=async(uid)=>{
        try {
            const response = await axios.get(`http://localhost:4000/pedal/station/getLikesData/${uid}`);
            console.log('즐겨찾기 목록',response.data);
            setLikes(response.data);
        } catch (error) {
            console.error('likes_error',error);
        }
    }

    //즐겨찾기 페이징
    const [page, setPage] = useState(1);
    const postPerPage = 3; // 페이지당 상품 갯수
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const [currentPost, setCurrentPost] = useState([]);

    useEffect(() => {
        const currentPosts = likes.slice(indexOfFirstPost, indexOfLastPost);
        setCurrentPost(currentPosts);
    }, [likes, indexOfFirstPost, indexOfLastPost]);
    
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className='likes-container'>
            <div className='likes-warp'>
                <div className='likes-list-title'>즐겨찾는 대여소</div>
                {currentPost && currentPost.map(item=>
                    <div className='likes-value' onClick={()=>{handleClick(item)}}>
                        <div className='likes-item-title' key={item.slike_id}>
                            <div className='star'><FaStar/></div>
                            <div className='item-title'>{item.rentIdNm}</div>
                        </div>
                        <div className='item-value'>
                            <div>위치: {item.staAddr}</div>
                            <div>대여 가능 수: {item.holdNum}</div>
                        </div>
                    </div>
                )}
                <Pagination
                activePage={page}
                itemsCountPerPage={postPerPage}
                totalItemsCount={likes.length}
                pageRangeDisplayed={3}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                />
                <div className='likes-close' onClick={onCloseLike}>닫기</div>
            </div>
        </div>
    );
};

export default Likesdata;