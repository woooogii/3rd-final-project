import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Tabs, Switch } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyTicketList } from './style/MyPageTicketListCss';
import Numeral from 'numeral';
import Pagination from "react-js-pagination";

function MyPageTicketList() {
//페이징 처리
const [page, setPage] = useState(1);
const postPerPage = 3;
const indexOfLastPost = page * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;

const handlePageChange = (page) => {
  setPage(page);
};

//--------------------------------------------

  const [tickets, setTickets] = useState([]);
  
  const navigate = useNavigate();

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
          console.log("티켓 데이터:", response.data);
          const ticketData = response.data.map(ticket => ({
            ...ticket,
            payTime: moment(ticket.mtPayTime).format('YYYY.MM.DD HH:mm:ss'),
            mtEndTime:calculateReturnTime(ticket),
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


  //티켓 종류에 따른 반납시간
  const calculateReturnTime = (ticket) => {
    if (ticket.mtName === '1시간(일일권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (ticket.mtName === '2시간(일일권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(2, 'hour').format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (ticket.mtName === '7일권(정기권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(7, 'day').format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (ticket.mtName === '30일권(정기권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(30, 'day').format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (ticket.mtName === '180일권(정기권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(180, 'day').format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (ticket.mtName === '365일권(정기권)') {
        const startTime = moment(ticket.mtStartTime);
        if (startTime.isValid()) {
            return startTime.add(365, 'day').format('YYYY-MM-DD HH:mm:ss');
        }
    }
    return ticket.mtEndTime;
}




  const filteredTickets = tickets.filter(ticket => ticket.uid === loginUser.uid);



    const toggleTicketStatus = async (mtMerchantUid) => {
    try {
        const startTime = moment();
        const updatedTickets = tickets.map(ticket => {
            if (ticket.mtMerchantUid === mtMerchantUid) {
                return {
                    ...ticket,
                    myStatus: !ticket.myStatus,
                    startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
                };
            }
            return ticket;
        });

        // 변경된 티켓 상태를 서버로 전송합니다.
        const newStatus = updatedTickets.find(ticket => ticket.mtMerchantUid === mtMerchantUid).myStatus;
        const response = await axios.post('http://localhost:4000/pedal/ticketStatus', {
            mtMerchantUid,
            newStatus,
            mtStartTime: startTime.format('YYYY-MM-DD HH:mm:ss') // 변경된 startTime 값을 전송합니다.
        });

        if (response.status === 200) {
            setTickets(updatedTickets);
            fetchMyTicketData();
        } else {
            fetchMyTicketData(); // 서버 응답이 오류인 경우 데이터를 다시 가져옵니다.
            console.error('서버 응답 오류:', response.statusText);
        }
    } catch (error) {
        console.error('티켓의 이용 여부를 변경하지 못했습니다:', error);
    }
    
};

// 데이터를 받아온 후 정렬하는 부분, 최근 구매 날짜가 가장 위에 오게 
const sortedTickets = [...tickets].sort((a, b) => {
    return new Date(b.mtPayTime) - new Date(a.mtPayTime);
  });
  


  return (
      <MyTicketList>
          <h4 className="myTicket_title"> - 이용권 내역</h4>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <br />

          <b>
              <ul className="myTicket_head">
                <li style={{ width: '17%' }}>티켓 번호</li>
                <li style={{ width: '20%' }}>상품명</li>
                <li style={{ width: '25%' }}>상품가격</li>
                <li style={{ width: '17%' }}>구매시간</li>
                <li style={{ width: '35%' }}>이용시작시간</li>
                <li style={{ width: '20%' }}>이용반납시간</li>
                <li style={{ width: '30%' }}>이용 여부</li>
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
                sortedTickets
                .filter(ticket => ticket.uid === loginUser.uid)
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((ticket) => (
                      <div key={ticket.mtId}>
                          <div className="myTicket_list" style={{ width: '1300px' }}>
                          <div style={{ width: '10%', paddingLeft: '30px' }}>{ticket.mtMerchantUid}</div>
                              <div style={{ width: '17%' }}><b>{ticket.mtName}</b></div>
                              <div style={{ width: '8%' }}>{Numeral(ticket.mtAmount).format(0.0)}</div>
                              <div style={{ width: '19%' }}>{ticket.mtPayTime}</div>
                              <div style={{ width: '12%' }}><b>{ticket.mtStartTime}</b></div>
                              <div style={{ width: '21%' }}><b>{ticket.mtEndTime}</b></div>
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

          <Pagination
             activePage={page}
             itemsCountPerPage={postPerPage}
             totalItemsCount={tickets.length}
             pageRangeDisplayed={5}
             prevPageText={"‹"}
             nextPageText={"›"}
             onChange={handlePageChange}/>

            <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '35vw', marginTop: '20px' }}>
                  &nbsp;메인으로&nbsp;
              </button>
          </>
      </MyTicketList>
  );
}

export default MyPageTicketList;