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

function MyPageTicketList() {

  const [tickets, setTickets] = useState([]);
  
  const navigate = useNavigate();

  const onChange = (key) => {
      console.log(key);
  };

  const items = [
      {
          key: '1',
          label: '구매 내역',
      },
  ];

  const fetchMyTicketData = async () => {
      try {
          const response = await axios.get('http://localhost:4000/pedal/myTicketList');
          const ticketData = response.data.map(ticket => ({
            ...ticket,
            payTime: moment(ticket.mtPayTime).format('YYYY.MM.DD HH:mm:ss'),
        }));
          ticketData.forEach(ticket => {
            console.log("사용완료: ", ticket.myStatus);
        });
         
          console.log("데이터", response.data);
          setTickets(ticketData);
      } catch (error) {
          console.error('티켓 목록을 불러오지 못했습니다:', error);
      }
  };
  const [user,setUser] = useState(''); 
  const loginUser = useSelector((state) => state.loginUser)

  useEffect(() => {
    setUser(loginUser.uid);
  }, [loginUser.uid]);
  
  useEffect(() => {
    if(user!==''){
      fetchMyTicketData();
    }
  }, [user]);


  const filteredTickets = tickets.filter(ticket => ticket.uid === loginUser.uid);

  const toggleTicketStatus = async (mtMerchantUid) => {
    try {
        const startTime = moment();
        const updatedTickets = tickets.map(ticket => {
            if (ticket.mtMerchantUid === mtMerchantUid) {
                return {
                    ...ticket,
                    myStatus: !ticket.myStatus
                };
            }
            return ticket;
        });
        setTickets(updatedTickets);

        // 변경된 티켓 상태를 서버로 전송합니다.
        const newStatus = updatedTickets.find(ticket => ticket.mtMerchantUid === mtMerchantUid).myStatus;
        const response = await axios.post('http://localhost:4000/pedal/ticketStatus', {
            mtMerchantUid,
            newStatus,
            startTime: startTime.format('YYYY.MM.DD HH:mm:ss')
        });
        
        if (response.status !== 200) {
          fetchMyTicketData();
            console.error('서버 응답 오류:', response.statusText);
        }
    } catch (error) {
        console.error('티켓의 이용 여부를 변경하지 못했습니다:', error);
    }
};

  return (
      <MyTicketList>
          <h4 className="myTicket_title"> - 이용권 내역</h4>

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
              {filteredTickets.length === 0 ? (
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
                              <div style={{ width: '24%' }}>{ticket.mtName}</div>
                              <div style={{ width: '7%' }}>{ticket.mtAmount}</div>
                              <div style={{ width: '23%' }}>{ticket.mtPayTime}</div>
                              <div style={{ width: '23%' }}>{moment(ticket.startTime).format('YYYY.MM.DD HH:mm:ss')}</div>
                              <div style={{ width: '21%' }}>{ticket.mtPayTime}</div>
                              <div style={{ width: '10%' }}>
                                  {ticket.myStatus ? '사용완료' : '미사용'}&nbsp;
                                  <Switch checked={ticket.myStatus} onChange={() => toggleTicketStatus(ticket.mtMerchantUid)}  disabled={ticket.myStatus} />
                              </div>
                          </div>
                          <hr />{' '}
                      </div>
                  ))
              )}
          </div>
          <>
            <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '35vw', marginTop: '20px' }}>
                  &nbsp;메인으로&nbsp;
              </button>
          </>
      </MyTicketList>
  );
}

export default MyPageTicketList;