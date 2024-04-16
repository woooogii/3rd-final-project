import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    color: #343a40;

    .check-icon {
        margin-top: 130px;
        color: #65A675;
        width: 100px;
        height: 100px;
    }

    .info {
        display: flex;
        justify-content: space-between;
        margin: 20px;
       
    }

    .info1 {
        font-weight: bold;
        padding-left: 60px;
        color: #A4A4A4; 
    }
   
    .info2 {
        width: 45%;
        color: #333; 
        font-family: '새굴림';
        font-weight: bold;
    }

    /* .infoLine {
        margin-top: 30px;
        font-size: 18px;
        font-weight: bold;
    } */

    .info_name {
        margin-top: 65px;
        background-color: #f8f9fa;
        border-radius: 10px;
        border: 1px solid #ccc;
        width: 600px;
        padding: 10px;
    }

 
    .info ul {
        list-style-type: none;
        margin: 0;
        
    }

    .info ul li {
        font-size: 16px;
        margin-bottom: 10px;
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

const PayResult = () => {

    var animateButton = function(e) {
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },700);
      };
      
      var bubblyButtons = document.getElementsByClassName("bubbly-button");
      
      for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
      }
    
    const navigate = useNavigate();


    const onMyPage = () => {
        navigate('/pedal/myPage');
    }

    const onMain = () => {
        navigate('/pedal/home');
    }

      //(new Date())현재시간을 읽어올거임
      const [date,setDate] = useState(new Date())

    // location 객체를 가져옴
    const location = useLocation();

    // location.state로부터 buyerInfo를 가져옴
    const { buyerInfo } = location.state || {};

    return (
        <StyledContent>
            <FiCheckCircle className="check-icon" />
            {/* <p className='infoLine'>결제정보</p> */}

            <h2>윤수인<span className="small">&nbsp;님 구매가 완료되었습니다!</span></h2><br/>
            <p style={{color:'#A4A4A4', fontFamily:'새굴림'}}><b>[주문번호: {buyerInfo?.merchant_uid}]</b></p>

            {buyerInfo ? (
                <div className='info_name'>
                    <div className='info'>
                        <ul className='info1'>
                            <li>상품명</li>
                            <li>주문일자</li>
                            <li>결제수단</li>
                            <li>결제금액</li>
                        </ul>
                        <div className="vertical-line"></div>
                        <ul className='info2'>
                            <li>{buyerInfo.name}</li>
                            <li style={{fontSize:'17px'}}>
                            {date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '')}{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
</li>
                            <li>카드({buyerInfo.pay_method})</li>
                            <li style={{color:'red'}}><b>{buyerInfo.amount}</b>원</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>주문 정보를 가져올 수 없습니다.</p>
            )}

            <br/> <br/>
            <hr style={{width:'700px'}}/>
            <br/> 
            <div className='btn'>
                <button type="button" className="btn btn-outline-success" onClick={onMyPage}>&nbsp;마이페이지&nbsp;</button>
                <button type="button" className="btn btn-success" onClick={onMain}>&nbsp;메인으로&nbsp;</button>
            </div>
        </StyledContent>
    );
};

export default PayResult;
