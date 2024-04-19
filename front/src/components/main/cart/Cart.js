import React, { useEffect, useState } from "react";
import CartPay from "./CartPay";
import axios from 'axios';
import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiSquarePlus,CiSquareMinus } from "react-icons/ci";
import {Card, Image, ItemBox, QuantityButton, QuantityBox, CartContainer,
  CartBox, CartPayContainer} from './CartStyle';
  import { FaRegCircleXmark } from "react-icons/fa6";
import '../../../styles/cart.css'



const Cart = () => {
  let loginUser = useSelector((state)=>{ return state.loginUser });
  const [itemQuantities, setItemQuantities] = useState({}); // 각 아이템 수 (이거로 price*수 해서 가격 받을거)
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 담을거
  const [user, setUser] = useState(''); //현재 로그인한 유저
  const [cartItems, setCart] = useState([]); // 그 유저의 카트속 템들 가져온거 
  const [cartEmpty, setCartEmpty] = useState(false); // 장바구니가 비어있는지 여부

  useEffect(() => { //랜더링될때 로그인한 유저 카트
    if (user !== '') {
      showCart();
    }

    return () => {
      setUser(loginUser.uid);
    };
  }, [user]);

  const showCart = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pedal/mycart?uid=${user}`)
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
      console.log("삭제: " + user + " / " + pid);
      // 총액에서 삭제된 상품의 가격을 제거하기
      setTotalPrice(prevPrice => prevPrice - (itemQuantities[pid] || 0) * price);
      // 삭제 요청이 성공했을 때 장바구니에서 해당 아이템을 제거하기
      setCart(prevCart => prevCart.filter(item => item.pid !== pid));
      setCartEmpty(prevCart => prevCart.length === 1); // 카트 아이템이 하나밖에 없으면 장바구니가 비어있음
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (pid, price) => {
    setItemQuantities(prevState => ({
      ...prevState,
      [pid]: (prevState[pid] || 0) + 1
    }));
    setTotalPrice(prevPrice => prevPrice + price); // 가격 추가
  };

  const handleDecrement = (pid, price) => {
    if (itemQuantities[pid] > 0) {
      setItemQuantities(prevState => ({
        ...prevState,
        [pid]: Math.max((prevState[pid] || 0) - 1, 0)
      }));
      setTotalPrice(prevPrice => prevPrice - price); // 가격 감소
    }
  };
 

  return (
    <CartContainer>
      <div>{loginUser.uname}님 구매를 서두르세요!</div>
      <CartBox>
        <div className="cart-box">
          {cartEmpty ? (
            <div>장바구니가 비어있습니다.</div>
          ) : (
            cartItems.map((item) => (
              <Card key={item.pid}>
                <Image src="/image/03.jpg"/>
                <ItemBox>
                  <div>품명: {item.pname}</div>
                  <div>가격: {(item.pprice) * (itemQuantities[item.pid] || 0)}</div>
                </ItemBox>
                <QuantityBox>
                      <CiSquareMinus size={30} onClick={() => handleDecrement(item.pid, item.pprice)}/> 
                            <div>{itemQuantities[item.pid] || 0}</div>
                      <CiSquarePlus size={30} onClick={() => handleIncrement(item.pid, item.pprice)}/> 
               </QuantityBox>
                    <FaRegCircleXmark onClick={() => removeItem(item.pid, item.pprice)}/>
                </Card>
              ))
            )}
          </div>
        </CartBox>
        <CartPayContainer>
          <CartPay totalPrice={totalPrice}/>  
        </CartPayContainer>
      </CartContainer>
  );
};

export default Cart;