import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import "./style/MainButton.css";

const MainButton = () => {

    const loginUser = useSelector((state) => state.loginUser); // Redux에서 로그인 정보 가져오기

    const navigate = useNavigate();

    // 티켓 상태 관리
    const [ticketStatus, setTicketStatus] = useState([]);

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


            <div className="main">
            <div className="card-main">
                <div className="heading">내 티켓 구매내역</div>
                <div className="details">사용하실 이용권을 클릭해주세요.</div>
                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked={ticket.myStatus} onChange={() => toggleTicketSwitch(ticket.mtMerchantUid)} />
                                        <span className="toggle-switch__slider" />
                    </label>
                <button className="btn2"><a href="/pedal/myTicketList">마이페이지 확인</a></button>
            </div>
            <svg className='glasses' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#1675f2" d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" style={{rotat:'-45'}}/></svg>
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
