import React, { useEffect, useState } from "react";
import CartList from "./CartList";
import CartPay from "./CartPay";
import axios from 'axios';

const Cart = () => {

/*
 1. 아니 이 페이지 열릴떄 useEffect로 , 세션 아이디값 받은거
 통해서 그 아이디 속 장바구니 가져와?
 2. 서버에선 where id랑 / 프로덕트테이블 조인문써서 이름, 가격
 3. 아작스로 가격변동시키기 
*/

  //사용중인 유저
 const [user,setUser] = useState('');

 //유저가 담은 카트 아이템들 
 const [cartItems, setCart] = useState([]);


 useEffect(()=>{
    if(user!==''){
     showCart();}

     return ()=>{ //useEffect 실행되기 전에 이거 먼저 실행됨
      setUser('rud101')
     }
  },[user]) 


  //우선 아이디 기준으로 카트 목록 받기 
  const showCart = async () => {
          
    try {

      const response = await axios.get(`http://localhost:4000/pedal/mycart?uid=${user}`)
      setCart(response.data)
      console.log('보낸 아이디:' + user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <CartList/>
      </div>
      <div>
        <CartPay/>  
      </div>
    </>
  );
};

export default Cart;
