import React, { useEffect, useState } from "react";
import CartPay from "./CartPay";
import axios from 'axios';
import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Card, Image, ItemBox, QuantityButton, QuantityBox, CartContainer, CartBox, CartPayContainer } from './CartStyle';
import { FaRegCircleXmark } from "react-icons/fa6";
import { Tabs, Switch } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MyTicketList = styled.div`
  margin: 50px;
  font-family: 'noto-sans';
  width: 75%;
  margin: auto;
  
  .myTicket_title{
    margin-top: 60px;
    padding-bottom: 40px;
    color: #585858;
    font-weight: bold;
  }

  .myTicket_head{
    width: 75%;
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
    height: 150px;
  }
`;

const Cart = () => {
  let loginUser = useSelector((state) => { return state.loginUser });
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState('');
  const [cartItems, setCart] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(loginUser.uid);
  }, [loginUser.uid]);

  useEffect(() => {
    if (user !== '') {
      showCart();
    }
  }, [user]);

  const showCart = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pedal/mycart?uid=${user}`);
      setCart(response.data);
      setCartEmpty(response.data.length === 0);
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = async (pid, price) => {
    try {
      await axios.post('http://localhost:4000/pedal/cartRemove', {
        uid: user,
        pid: pid
      });
      setTotalPrice(prevPrice => prevPrice - (itemQuantities[pid] || 0) * price);
      setCart(prevCart => prevCart.filter(item => item.pid !== pid));
      setCartEmpty(prevCart => prevCart.length === 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (pid, price) => {
    setItemQuantities(prevState => ({
      ...prevState,
      [pid]: (prevState[pid] || 0) + 1
    }));
    setTotalPrice(prevPrice => prevPrice + price);
  };

  const handleDecrement = (pid, price) => {
    if (itemQuantities[pid] > 0) {
      setItemQuantities(prevState => ({
        ...prevState,
        [pid]: Math.max((prevState[pid] || 0) - 1, 0)
      }));
      setTotalPrice(prevPrice => prevPrice - price);
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <MyTicketList>
          <h4 className="myTicket_title"> - 장바구니</h4>
          <br />
          <b>
            <ul className="myTicket_head">
              <li style={{ width: '15%', marginLeft: '20px' }}>상품</li>
              <li style={{ width: '25%', marginLeft: '80px' }}>상품명</li>
              <li style={{ width: '25%', marginLeft: '50px' }}>상품 가격</li>
              <li style={{ width: '15%', marginLeft: '40px' }}>수량</li>
              <li style={{ width: '15%', marginLeft: '60px' }}>총 가격</li>
              <li style={{ width: '5%', marginLeft: '30px' }}>수정</li>
            </ul>
          </b>
          <hr />
          <div>
            {cartEmpty ? (
              <div>
                <br />
                <p style={{ textAlign: 'center', marginTop: '10px' }}>장바구니가 비었습니다.</p>
                <br />
                <hr />
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.pid}>
                  <div className="myTicket_list" style={{ width: '1000px' }}>
                    <div style={{ width: '15%', paddingLeft: '10px' }}><Image src="/image/03.jpg" /></div>
                    <div style={{ width: '25%' }}>{item.pname}</div>
                    <div style={{ width: '25%' }}>{item.pprice}</div>
                    <div style={{ width: '15%' }}>
                      <QuantityBox>
                        <CiSquareMinus size={30} onClick={() => handleDecrement(item.pid, item.pprice)} />
                        <div>{itemQuantities[item.pid] || 0}</div>
                        <CiSquarePlus size={30} onClick={() => handleIncrement(item.pid, item.pprice)} />
                      </QuantityBox>
                    </div>
                    <div style={{ width: '15%' }}> {(item.pprice) * (itemQuantities[item.pid] || 0)}</div>
                    <div style={{ width: '5%' }}> <FaRegCircleXmark onClick={() => removeItem(item.pid, item.pprice)} /></div>
                  </div>
                  <hr />{' '}
                </div>
              ))
            )}
          </div>
          <button className="btn btn-primary" type="button" onClick={() => navigate('/pedal/home')} style={{ marginLeft: '35vw', marginTop: '20px' }}>
            &nbsp;메인으로&nbsp;
          </button>
        </MyTicketList>
        <CartPayContainer>
          <CartPay totalPrice={totalPrice} cartItems={cartItems} />
        </CartPayContainer>
      </div>
    </>
  );
};

export default Cart;
