import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './style/likes.css';
import { IoCloseSharp } from "react-icons/io5";

const Likesdata = ({onCloseLike,uid}) => {
    const [likes,setLikes] = useState([]);
    console.log('like_uid',uid)

    useEffect(()=>{
        fetchData(uid);
    },[uid]);
    
    const fetchData=async(uid)=>{
        try {
            const response = await axios.get(`http://localhost:4000/pedal/station/likesData/${uid}`);
            console.log(response.data);
            setLikes(response.data);
        } catch (error) {
            console.error('likes_error',error);
        }
    }

    return (
        <div className='likes-container'>
            <div className='likes-warp'>
                {/* <div className='likes-close' onClick={onCloseLike}><IoCloseSharp/></div> */}
                <div className='likes-value'>
                    즐겨찾기 데이터 추가, 삭제 완료
                    목록 보기 css 진행중 - 채팅 기능 구현하면서 틈틈히 할 예정
                    {likes && likes.map(item=>{
                        <ul key={item.sid}>
                            <li className='likes-item'>{item.stationId}</li>
                        </ul>
                    })}
                    <button className='likes-close' onClick={onCloseLike}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Likesdata;