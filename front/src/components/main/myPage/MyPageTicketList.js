// MyPageTicketList.js

import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Tabs, Switch } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
    padding-bottom: 50px;
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

function MyPageTicketList() {
  const [ticketStatus, setTicketStatus] = useState([]);
  const navigate = useNavigate();
  
  const onChange = (key) => {
    console.log(key);
  };
  
  const items = [
    {
      key: '1',
      label: '구매내역',
    },
  ]
  
  // 구매한 티켓 목록을 state로 관리
  const [tickets, setTickets] = useState([]);

  // 티켓 정보를 불러오는 함수
  useEffect(() => {
    const fetchMyTicketData = async () => {

      try {
        const response = await axios.get('http://localhost:4000/pedal/myTicketList');
        const ticketData = response.data.map(ticket => ({
          ...ticket,
          myStatus: false,
          payTime: moment(ticket.mtPayTime).format('YYYY.MM.DD HH:mm:ss'), // DB에서 가져온 시간
        }));
        setTickets(ticketData);
      } catch (error) {
        console.error('티켓 목록을 불러오지 못했습니다:', error);
      }
    }
    fetchMyTicketData();
  }, []);
  
  // DB에서 가져온 시간을 사용하여 구매 일자를 표시
  const payTime = moment(tickets.payTime).format('YYYY.MM.DD HH:mm:ss');
  
  // 티켓 이용 여부 변경 함수
  const toggleTicketStatus = async (mtMerchantUid) => {
    try {
      await axios.post('http://localhost:4000/pedal/ticketStatus', {
        mtMerchantUid,
        newStatus: !ticketStatus.find(ticket => ticket.mtMerchantUid === mtMerchantUid).myStatus
      });

      const response = await axios.get('http://localhost:4000/pedal/myTicketList');
      setTicketStatus(response.data);
    } catch (error) {
      console.error('티켓의 이용 여부를 변경하지 못했습니다:', error);
    }
  };

  return (
      <MyTicketList>
          <h3 className="myTicket_title">내 구매내역</h3>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <br />

          <b>
              <ul className="myTicket_head">
                  <li style={{ width: '10%' }}>티켓 번호</li>
                  <li style={{ width: '20%' }}>상품명</li>
                  <li style={{ width: '10%' }}>상품가격</li>
                  <li style={{ width: '20%' }}>구매시간</li>
                  <li style={{ width: '20%' }}>이용시작시간</li>
                  <li style={{ width: '20%' }}>이용반납시간</li>
                  <li style={{ width: '10%' }}>이용 여부</li>
              </ul>
          </b>
          <hr />

          <div>
              {tickets.length === 0 ? (
                  <div>
                    <br />
                      <p style={{textAlign:'center', marginTop:'10px'}}>데이터가 없습니다.</p>
                      <br />
                      <hr />
                      <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '34vw', marginTop: '20px'}}>
                          &nbsp;메인으로&nbsp;
                      </button>
                  </div>
              ) : (
                  tickets.map((ticket) => (
                      <div key={ticket.mtId}>
                          <div className="myTicket_list" style={{ width: '1300px' }}>
                              <div style={{ width: '10%', paddingLeft: '30px' }}>{ticket.mtMerchantUid}</div>
                              <div style={{ width: '24%' }}>{ticket.mtName}</div>
                              <div style={{ width: '7%' }}>{ticket.mtAmount}</div>
                              <div style={{ width: '23%' }}>{payTime}</div>
                              <div style={{ width: '20%' }}>{payTime}</div>
                              <div style={{ width: '21%' }}>{payTime}</div>
                              <div style={{ width: '10%' }}>
                                  {ticket.myStatus ? '미사용' : '사용완료'}&nbsp;
                                  <Switch checked={ticket.myStatus} onChange={() => toggleTicketStatus(ticket.mtMerchantUid)} />
                              </div>
                          </div>
                          <hr />{' '}
                      </div>
                   
                  ))
              )}
                 <div>
                        <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '34vw', marginTop: '20px'}}>
                        &nbsp;메인으로&nbsp;
                    </button>
                    </div>
          </div>
      </MyTicketList>
  );
}

export default MyPageTicketList;
