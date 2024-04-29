import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Tabs, Switch } from 'antd';
import styled from 'styled-components';
import { Image } from '../cart/CartStyle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Numeral from 'numeral';
import Pagination from "react-js-pagination";
import './myOrder.css'

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

  const items = [
    {
        key: '1',
        label: '구매 내역',
    },
  ];

    const onChange = (key) => {
      console.log(key);
  };



const MyPageOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    let loginUser = useSelector((state) => { return state.loginUser });

    //페이징 처리
    const [page, setPage] = useState(1);
    const postPerPage = 5;
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
 
    const handlePageChange = (page) => {
      setPage(page);
    };


    
    useEffect(() => {
      setUser(loginUser.uid);
    }, [loginUser.uid]);
    

    useEffect(() => {
      if (user !== '') {
        fetchOrderData();
      }
    }, [user]);
    

    const fetchOrderData = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/pedal/orderList?uid=${user}`);
          console.log("뭐가 왔니" , response.data)
          setOrders(response.data)

      } catch (error) {
          console.error('티켓 목록을 불러오지 못했습니다:', error);
      }
    };

// 데이터를 받아온 후 정렬하는 부분, 최근 구매 날짜가 가장 위에 오게 
const sortedOrders = [...orders].sort((a, b) => {
  return new Date(b.orderDate) - new Date(a.orderDate);
});

return (
  <MyTicketList>

      <h4 className="myTicket_title"> - 쇼핑몰 이용 내역</h4>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <br />
      <b>
          <ul className="myTicket_head">
              <li style={{ width: '10%' }}>상품</li>
              <li style={{ width: '20%' }}>상품명</li>
              <li style={{ width: '10%' }}>상품가격(원)</li>
              <li style={{ width: '20%' }}>구매수량</li>
              <li style={{ width: '20%' }}>결제금액(원)</li>
              <li style={{ width: '20%' }}>구매일시</li>
          </ul>
      </b>
      <hr />
      <div>
          {sortedOrders.length === 0 ? (
              <div>
                  <br />
                  <p style={{ textAlign: 'center', marginTop: '10px' }}>데이터가 없습니다.</p>
                  <br />
                  <hr />
              </div> 
          ) : (
            sortedOrders.slice(indexOfFirstPost, indexOfLastPost).map((order) => (
                  <div key={order.onum}>
                      <div className="myTicket_list" style={{ width: '1300px' }}>
                          <div style={{ width: '10%', paddingLeft: '30px' }}><Image src={order.pimage}   /></div>
                          <div style={{ width: '20%' }}>{order.pname}</div>
                          <div style={{ width: '10%' }}>{Numeral(order.pprice).format(0.0)}</div>
                          <div style={{ width: '20%' }}>{order.amount}</div>
                          <div style={{ width: '20%' }}>{Numeral(order.pprice * order.amount).format(0.0)}</div>
                          <div style={{ width: '20%' }}>{order.orderDate}</div>
                      </div>
                      <hr />{' '}
                  </div>
              ))
          )}
             <Pagination
             activePage={page}
             itemsCountPerPage={postPerPage}
             totalItemsCount={orders.length}
             pageRangeDisplayed={5}
             prevPageText={"‹"}
             nextPageText={"›"}
             onChange={handlePageChange}/>
      </div>
      <>
          <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '35vw', marginTop: '20px', marginBottom: '20px' }}>
              &nbsp;메인으로&nbsp;
          </button>
      </>
  </MyTicketList>
);
};

export default MyPageOrders;