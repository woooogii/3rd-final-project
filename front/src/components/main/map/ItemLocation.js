import React, { useState, useEffect } from 'react';
import { FaRegStar,FaStar } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemLocation = ({ content, closeResult }) => {
    const [likes, setLikes] = useState({});
    const loginUser = useSelector((state) => state.loginUser);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikes = async () => {
            if (loginUser.uid) {
                try {
                    const response = await axios.get(`http://localhost:4000/pedal/station/getStationLikes/${loginUser.uid}`);
                    const userLikes = response.data.reduce((acc, like) => {
                        acc[like.stationId] = true;
                        return acc;
                    }, {});
                    setLikes(userLikes);
                } catch (error) {
                    console.error('Error fetching likes:', error);
                }
            }
        };

        fetchLikes();
    }, [loginUser.uid]);

    const handleLikeClick = async (data) => {
        if (!loginUser.uid) {
            alert('로그인 후 사용 가능합니다.');
            navigate('/pedal/login');
            return;
        }

        try {
            if (likes[data]) {
                console.log('즐겨찾기 삭제:', data);
                await axios.post('http://localhost:4000/pedal/station/deleteStationLikes', {
                    user: loginUser.uid,
                    stationId: data,
                });
                setLikes(prevLikes => ({ ...prevLikes, [data]: false }));
            } else {
                await axios.post('http://localhost:4000/pedal/station/addStationLikes', {
                    user: loginUser.uid,
                    stationId: data,
                });
                console.log('즐겨찾기 추가:', data);
                setLikes(prevLikes => ({ ...prevLikes, [data]: true }));
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
                        <i onClick={() => handleLikeClick(content.sid)}>
                            {likes[content.sid] ? <FaStar /> : <FaRegStar />}
                        </i>
                    </div>
                    <div className="close" onClick={closeResult}>
                        <IoCloseSharp />
                    </div>
                </div>
                <div className='box'>
                    <div className='addr-name'>위치</div>
                    <div className='addr'>{content.sta_add1}</div>
                </div>
                <div className='box'>
                    <div className='num-name'>대여 가능 수</div>
                    <div className='num'>
                        {content.hold_num > 0 ? content.hold_num : 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemLocation;
