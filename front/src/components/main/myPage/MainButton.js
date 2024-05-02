import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import "../myPage/MainButton.css"

const MainButton = () => {

    const loginUser = useSelector((state) => state.loginUser); // Redux에서 로그인 정보 가져오기

    const navigate = useNavigate();

    // 티켓 상태 관리
    const [ticketStatus, setTicketStatus] = useState([]);
    const [lightOn, setLightOn] = useState(false); // 불빛 상태 관리

    // 티켓 정보를 불러오는 함수
    useEffect(() => {
        if (loginUser.uid) {
            const fetchMyTicketData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/pedal/myTicketList');

                    // 사용완료된 티켓은 나타나지 않게 필터링해서 상태에 저장
                    setTicketStatus(response.data.filter(ticket => !ticket.myStatus));
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
        setTicketStatus(response.data.filter(ticket => !ticket.myStatus));

    } catch (error) {
        console.error('티켓의 이용 여부를 변경하지 못했습니다:', error);
    }
};

const toggleLightOn = () => {
    setLightOn(true);
    setTimeout(() => {
      setLightOn(false);
    }, 3000);
  };
  
  const toggleTicketSwitch = async (mtMerchantUid) => {
    try {
      // 이용 여부 변경 API 호출
      await toggleTicketStatus(mtMerchantUid);
      // 불빛 효과 켜기
      toggleLightOn();
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
            return ticketStatus.map((ticket) => (
                <div key={ticket.mtMerchantUid}>
                    <div className={`mainButton ${lightOn ? 'light-on' : ''}`}>
                        <div className="myTicket_box">
                            <div className="myTicket_box_sub">
                                <div className="myTicket_title">내 티켓 구매내역</div>
                                <span>사용하실 이용권을 클릭해주세요.</span>
                                <a href='/pedal/myTicketList'>마이페이지 확인</a>
                                <label className={`switch ${lightOn ? 'light-on' : ''}`} onClick={() => toggleTicketSwitch(ticket.mtMerchantUid)}>
                                Start
                                <svg className="slider" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                                </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ));
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
