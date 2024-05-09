import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  flex-direction: row; /* 이미지와 텍스트를 가로로 정렬 */
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px;
`;

const ItemBox = styled.div`
  flex: 1;
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const CartItem = ({ item }) => {
    let loginUser = useSelector((state)=>{ return state.loginUser })
    const [quantity, setQuantity] = useState(1);

 
    



  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) { // 현재 수량이 1 이상일 때만 감소
        setQuantity(quantity - 1);
      }
  };



  return (
    <>
    <Card>
      <Image src="/image/03.jpg"/>
      <ItemBox>
        <div>품명: {item.pname}</div>
        <div>가격: {(item.pprice)*quantity}</div>
      </ItemBox>
      <QuantityBox>
        <QuantityButton onClick={handleDecrement}>-</QuantityButton>
        <div>{quantity}</div>
        <QuantityButton onClick={handleIncrement}>+</QuantityButton>
      </QuantityBox>
    </Card>


    </>
  );
};

export default CartItem;