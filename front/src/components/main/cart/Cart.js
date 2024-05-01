import React, { useEffect, useState } from "react";
import CartPay from "./CartPay";
import axios from 'axios';
import { useSelector } from "react-redux";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Image, QuantityBox, CartPayContainer } from './CartStyle';
import { FaRegCircleXmark } from "react-icons/fa6";
import { Tabs, Switch } from 'antd';
import { VscClose } from "react-icons/vsc";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Numeral from 'numeral';

const MyTicketList = styled.div`
  margin: 50px;
  font-family: 'noto-sans';
  width: 80%;
  margin: auto;
  
  .myTicket_title{
    margin-top: 60px;
    padding-bottom: 40px;
    color: #585858;
    font-weight: bold;
  }

  .myTicket_head{
    width: 85%;
    display: flex;
    list-style-type: none;
    padding-bottom: 5px;
    font-size: 14px;
    color: #9E9FA5;
    text-align: center;
    margin-bottom: -10px;
  }

  .myTicket_list{
    width: 85%;
    display: flex;
    list-style-type: none;
    font-size: 15px;
    color: #333;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    height: 120px;
    align-items: center; /* 세로 방향으로 가운데 정렬 */
  }

  hr{
    width: 87%
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

  const items = [
    {
        key: '1',
        label: '장바구니',
    },
  ];

    const onChange = (key) => {
      console.log(key);
  };

  


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
      console.log(response.data);

      const initialQuantities = {};
      let initialTotalPrice = 0; // 초기 총 가격을 저장할 변수
  
      response.data.forEach(item => {
        initialQuantities[item.pid] = item.camount;
        initialTotalPrice += item.camount * item.pprice; // 각 상품의 수량과 가격을 곱하여 총 가격에 추가
      });
      setItemQuantities(initialQuantities);
      setTotalPrice(initialTotalPrice); // 초기 총 가격 설정


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
      <div className="cart-list" style={{ display: 'flex', marginLeft: '100px', marginTop: '50px'}}>
      <MyTicketList>
        
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{width:'950px'}} />
        <br />
        <b>
          <ul className="myTicket_head">
            <li style={{ width: '20%', paddingLeft: '50px' }}>상품</li>
            <li style={{ width: '40%', marginLeft: '20px'}}>상품명</li>
            <li style={{ width: '20%', paddingLeft: '20px'}}>상품 가격(원)</li>
            <li style={{ width: '20%', paddingLeft: '20px' }}>수량</li>
            <li style={{ width: '20%' }}>총 가격(원)</li>
            <li style={{ width: '5%' }}></li>
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
                <div className="myTicket_list">
                  <div style={{ width: '20%', paddingLeft: '50px' }}><Image src={item.pimage1} /></div>
                  <div style={{ width: '40%', marginLeft: '20px' }}><b>{item.pname}</b></div>
                  <div style={{ width: '20%' }}>{Numeral(item.pprice).format(0.0)}</div>
                  <div style={{ width: '15%', paddingLeft: '30px'}}>
                    <QuantityBox>
                      <FiMinus size={17} onClick={() => handleDecrement(item.pid, item.pprice)} />
                      <div>&nbsp;&nbsp;{itemQuantities[item.pid] || 0}&nbsp;&nbsp;</div>
                      <IoIosAdd size={20} onClick={() => handleIncrement(item.pid, item.pprice)} />
                    </QuantityBox>
                  </div>
                  <div style={{ width: '20%', paddingLeft: '20px' }}> <b>{Numeral((item.pprice) * (itemQuantities[item.pid] || 0)).format(0.0)}</b></div>
                  <div style={{ width: '5%' }}> <VscClose  onClick={() => removeItem(item.pid, item.pprice)} style={{color:'#ced4da', fontSize: '25px'}}/></div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', marginBottom: '20px', marginLeft:'-150px' }}>
        <button className="shop-button" type="button" onClick={() => navigate('/pedal/shop')}>
          &nbsp;쇼핑 계속하기&nbsp;
        </button>
        <button className="cart-button" type="button" onClick={() => navigate('/pedal/home')}>
          &nbsp;메인으로&nbsp;
        </button>
        </div>
      </MyTicketList>
        <CartPayContainer>
          <CartPay totalPrice={totalPrice} cartItems={cartItems} itemQuantities={itemQuantities}/>
        </CartPayContainer>
      </div>
    </>
  );
};




export default Cart;
