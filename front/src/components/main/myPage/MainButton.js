import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import "../myPage/MainButton.css"
import { Switch } from 'antd';

const MainButton = () => {

    const loginUser = useSelector((state) => state.loginUser); // Redux에서 로그인 정보 가져오기

    const navigate = useNavigate();

    // 티켓 상태 관리
    const [ticketStatus, setTicketStatus] = useState([]);
    const [lightOn, setLightOn] = useState(false); // 불빛 상태 관리

    // 티켓 정보를 불러오는 함수
    useEffect(() => {
        if (loginUser.uid) {
            fetchMyTicketData();
        }
    }, [loginUser]);


    const fetchMyTicketData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/myTicketList');

            // 사용완료된 티켓은 나타나지 않게 필터링해서 상태에 저장
            setTicketStatus(response.data.filter(ticket => !ticket.myStatus));
        } catch (error) {
            console.error('티켓 목록을 불러오지 못했습니다:', error);
        }
    };


    const toggleTicketSwitch = async (mtMerchantUid) => {
        try {
            const switchTime = moment().format('YYYY.MM.DD HH:mm:ss');
            // 현재 스위치 상태를 가져오기
            const currentStatus = ticketStatus.find(ticket => ticket.mtMerchantUid === mtMerchantUid).myStatus;
            // 스위치 상태 변경
            const newStatus = !currentStatus;
            // 스위치 상태 변경 후 업데이트
            await axios.post('http://localhost:4000/pedal/ticketStatus', {
                mtMerchantUid,
                newStatus,
                mtStartTime: switchTime
            });
    
            // API 호출이 완료될 때까지 3초간 기다리기 - 3초간 불빛 띄우는 작업
            await new Promise(resolve => setTimeout(resolve, 3000)); 
    
            // 서버에서 티켓 정보 다시 가져와서 업데이트
            const response = await axios.get('http://localhost:4000/pedal/myTicketList');
            setTicketStatus(response.data.filter(ticket => !ticket.myStatus));
    
            // 이 부분에서 스위치의 체크를 변경 - OFF
            const switchElement = document.getElementById(`toggle-switch-${mtMerchantUid}`);

            if (switchElement.checked) {
              switchElement.checked = false;
            } else {
              switchElement.checked = true;
            }
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
                    <div>
                        <div className="myTicket_box">
                            <div className="myTicket_box_sub">
                                <div className="myTicket_title">내 티켓 구매내역</div>
                                <span>사용하실 이용권을 클릭해주세요.</span>
                                <a href='/pedal/myTicketList'>마이페이지 확인</a>
                                
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked={ticket.myStatus} onChange={() => toggleTicketSwitch(ticket.mtMerchantUid)} />
                                    <span className="toggle-switch__slider" />
                                </label>
                    
                            </div>
                        </div>
                        {/* <Switch defaultChecked={ticket.myStatus} onChange={() => toggleTicketStatus(ticket.mtMerchantUid)} /> */}
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
