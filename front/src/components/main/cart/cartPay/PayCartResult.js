import React from 'react';

import { useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    color: #343a40;

    .check-icon {
        margin-top: 130px;
        color: #1675F2;
        width: 100px;
        height: 100px;
    }

    .info_cart {
        display: flex;
        justify-content: space-between;
        margin: 20px;
       
    }

    .info1_cart {
        font-weight: bold;
        padding-left: 60px;
        color: #A4A4A4; 
    }
   
    .info2_cart {
        width: 45%;
        color: #333; 
        font-family: '새굴림';
        font-weight: bold;
    }

    .info_cart_name {
        margin-top: 65px;
        background-color: #f8f9fa;
        border-radius: 10px;
        border: 1px solid #ccc;
        width: 600px;
        padding: 10px;
    }
 
    .info_cart ul {
        list-style-type: none;
        margin: 0;
        
    }

    .info_cart ul li {
        font-size: 16px;
        margin-bottom: 12px;
        text-align: left; 
    }

    h2 {
        font-weight: bold; 
        font-size: 24px;
        margin-bottom: 0; 
        padding-top: 25px;
    }

    .small {
        font-size: 20px;
    }

    .btn {
        display: flex;
        margin-right: 20px;
    }

    .vertical-line {
    border-left: 1px solid #ccc;
    height: 130px;
    margin-left: 80px;
}
`;





const PayCartResult = () => {

    const navigate = useNavigate();

    const onMyPage = () => {
        navigate('/pedal/myPage');
    }

    const onMain = () => {
        navigate('/pedal/shop');
    }


    // location 객체를 가져옴
    const location = useLocation();

    // location.state로부터 buyerInfo를 가져옴
    const { buyerInfo } = location.state || {};

    const payTime = moment(buyerInfo.pay_time).format('YYYY.MM.DD HH:mm:ss');


    return (
         <StyledContent>
            <FiCheckCircle className="check-icon" />
            {/* <p className='infoLine'>결제정보</p> */}

            <h2>{buyerInfo.uname}<span className="small">&nbsp;님 구매가 <span style={{color:'#DD5746'}}>완료</span>되었습니다 !</span></h2><br/>
            <p style={{color:'#A4A4A4', fontFamily:'새굴림'}}><b>[주문번호: {buyerInfo.merchant_uid}]</b></p>

            {buyerInfo ? (
                <div className='info_cart_name'>
                    <div className='info_cart'>
                        <ul className='info1_cart'>
                            <li>상품명</li>
                            <li>주문일자</li>
                            <li>결제수단</li>
                            <li>결제금액</li>
                        </ul>
                        <div className="vertical-line"></div>
                        <ul className='info2_cart'>
                            <li>{buyerInfo.name}</li>
                            <li>{payTime}</li>
                            <li>카드({buyerInfo.pay_method})</li>
                            <li style={{color:'#DD5746'}}>{buyerInfo.amount}원</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>주문 정보를 가져올 수 없습니다.</p>
            )}

            <br/> <br/>
            <hr style={{width:'700px'}}/>
            <br />
            <div className='btn'>
                <button type="button" class="btn btn-outline-primary" onClick={onMyPage}>&nbsp;마이페이지&nbsp;</button>
                <button class="btn btn-primary" type="button" onClick={onMain}>&nbsp;쇼핑 계속하기&nbsp;</button>
            </div>
        </StyledContent>
    );
};

export default PayCartResult;