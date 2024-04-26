import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Tabs, Switch } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyTicketList = styled.div`
  margin: 50px;
  font-family: 'noto-sans';
    width: 75vw;
    margin: auto;
/* 
  hr{
    width: 75vw;
    margin: auto;
  } */

  .myTicket_title{
    margin-top: 60px;
    padding-bottom: 40px;
    color: #585858;
    font-weight: bold;
  }

  
  .myTicket_head{
    width: 1300px;
    display: flex;
    list-style-type: none;
    padding-bottom: 20px;
    font-size: 14px;
    color: #9E9FA5;
    text-align: center;
  }

  .myTicket_list{
    display: flex;
    list-style-type: none;
    font-size: 15px;
    color: #333;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
  }

`

const MyPageOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    let loginUser = useSelector((state) => { return state.loginUser });



    

    // const fetchOrderData = async () => {
    //   try {
    //       const response = await axios.get(`http://localhost:4000/pedal/orderList?uid=${user}`);
    //       const ticketData = response.data.map(ticket => ({
    //         ...ticket,
    //         payTime: moment(ticket.mtPayTime).format('YYYY.MM.DD HH:mm:ss'),
    //     }));
    //       ticketData.forEach(ticket => {
    //         console.log("사용완료: ", ticket.myStatus);
    //     });
         
    //       console.log("데이터", response.data);
    //       setTickets(ticketData);
    //   } catch (error) {
    //       console.error('티켓 목록을 불러오지 못했습니다:', error);
    //   }
    // };

    useEffect(() => {
      setUser(loginUser.uid);
    }, [loginUser.uid]);
    




    return (
        <MyTicketList>
        <h4 className="myTicket_title"> - 물품 구매 내역</h4>

       
        <br />

        <b>
            <ul className="myTicket_head">
                <li style={{ width: '10%' }}>상품</li>
                <li style={{ width: '20%' }}>상품명</li>
                <li style={{ width: '10%' }}>상품가격</li>
                <li style={{ width: '20%' }}>구매수량</li>
                <li style={{ width: '20%' }}>결제금액</li>
                <li style={{ width: '20%' }}>구매일시</li>
                <li style={{ width: '10%' }}>이용 여부</li>
            </ul>
        </b>
        <hr />

        <div>
            {/* {filteredTickets.length === 0 ? (
                <div>
                    <br />
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>데이터가 없습니다.</p>
                    <br />
                    <hr />
                </div>
            ) : (
                filteredTickets.map((ticket) => (
                    <div key={ticket.mtId}>
                        <div className="myTicket_list" style={{ width: '1300px' }}>
                            <div style={{ width: '10%', paddingLeft: '30px' }}>{ticket.mtMerchantUid}</div>
                            <div style={{ width: '24%' }}></div>
                            <div style={{ width: '7%' }}></div>
                            <div style={{ width: '23%' }}></div>
                            <div style={{ width: '23%' }}>{moment(ticket.startTime).format('YYYY.MM.DD HH:mm:ss')}</div>
                            <div style={{ width: '21%' }}></div>
                           
                        </div>
                        <hr />{' '}
                    </div>
                ))
            )} */}
        </div>
        <>
          <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '35vw', marginTop: '20px' }}>
                &nbsp;메인으로&nbsp;
            </button>
        </>
    </MyTicketList>
    );
};

export default MyPageOrders;