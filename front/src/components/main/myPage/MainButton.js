// MainButton.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const MainButton = () => {

    const loginUser = useSelector((state) => state.loginUser); // Redux에서 로그인 정보 가져오기

    const navigate = useNavigate();

    // 티켓 상태 관리
    const [ticketStatus, setTicketStatus] = useState([]);

    // 티켓 정보를 불러오는 함수
    useEffect(() => {
        if (loginUser.uid) {
            const fetchMyTicketData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/pedal/myTicketList');

                    //사용완료된 티켓은 나타나지않게 필터링해서 상태에 저장
                    setTicketStatus(response.data.filter(ticket=>!ticket.myStatus));
                } catch (error) {
                    console.error('티켓 목록을 불러오지 못했습니다:', error);
                }
            };
            fetchMyTicketData();
        }
    }, [loginUser]);

    // 티켓 이용 여부 변경 함수
    const toggleTicketStatus = async (mtMerchantUid) => {
        try {
            const switchTime = moment().format('YYYY.MM.DD HH:mm:ss');
            await axios.post('http://localhost:4000/pedal/ticketStatus', {
                mtMerchantUid,
                newStatus: !ticketStatus.find(ticket => ticket.mtMerchantUid === mtMerchantUid).myStatus,
                switchTime: switchTime
            });

            const response = await axios.get('http://localhost:4000/pedal/myTicketList');
            setTicketStatus(response.data.filter(ticket=>!ticket.myStatus));
        } catch (error) {
            console.error('티켓의 이용 여부를 변경하지 못했습니다:', error);
        }
    };

    // 로그인 상태 변경 함수
    const changeLoginStatus = () => {
        // 로그아웃 시에 티켓 상태를 초기화
        setTicketStatus([]);
        navigate('/pedal/login');
    };

    // 로그인 상태에 따라 스위치 렌더링 여부 결정
    const renderSwitch = () => {
        if (loginUser.uid !== null) { // 로그인 상태인 경우
            return (
                ticketStatus.map(ticket => (
                    <div key={ticket.mtMerchantUid}>
                        <Switch
                            defaultChecked={ticket.myStatus}
                            onChange={() => toggleTicketStatus(ticket.mtMerchantUid)}
                        />
                    </div>
                ))
            );
        } else { // 비로그인 상태인 경우
            return (
                <button onClick={changeLoginStatus}>로그인 필요</button> 
            );
        }
    };

    return (
        <div>
            {renderSwitch()}
        </div>
    )
};

export default MainButton;
