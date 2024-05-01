import React, { useState } from 'react';
import { FaRegStar,FaStar } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemLocation = ({content,closeResult}) => {
    const [like,setLike] = useState(false);
    const loginUser = useSelector((state) => state.loginUser);
    const navigate = useNavigate();
    const handleLikeClick=(data)=>{
      setData(data);
      setLike(!like);
    }

    const setData = async (data) => {
      if (!loginUser.uid) {
        alert('로그인 후 사용 가능합니다.');
        navigate('/pedal/login');
        return;
      }
  
      try {
        if (like) {
          console.log('즐겨찾기 삭제:', data);
          await axios.post('http://localhost:4000/pedal/station/deleteStationLikes', {
            user: loginUser.uid,
            stationId: data,
          });
          console.log('즐겨찾기 삭제:', data);
          setLike(false);
        } else {
          await axios.post('http://localhost:4000/pedal/station/addStationLikes', {
            user: loginUser.uid,
            stationId: data,
          });
          console.log('즐겨찾기 추가:', data);
          setLike(true);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    return (
        <div className="map-info-container">
          <div className="info" id='content'>
              <div className="title">
                <div className='circle'></div>
                <div className='title-text'>{content.rent_id_nm}</div>
                <div className='title-like'>
                  <i onClick={()=>handleLikeClick(content.sid)}>
                      {like ? <FaStar/>:<FaRegStar/>}
                  </i>
                </div>
                <div className="close" onClick={closeResult}>
                  <IoCloseSharp/>
                </div>
              </div>
              <div className='box'>
                <div className='addr-name'>위치</div>
                <div className='addr'>{content.sta_add1}</div>
              </div>
              <div className='box'>
                <div className='num-name'>대여 가능 수</div>
                <div className='num'>
                  {content.hold_num>0?content.hold_num:0}
                </div>
              </div>
            </div>
        </div>
    );
};

export default ItemLocation;