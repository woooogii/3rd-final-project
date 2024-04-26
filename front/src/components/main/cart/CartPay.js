import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { HiOutlineTicket, HiTicket } from 'react-icons/hi2';
import { Button } from 'antd';
import styled from 'styled-components';



import './cart.css'
import PayCartKakao from './cartPay/PayCartKakao';

const CartPay = ({totalPrice, cartItems,itemQuantities}) => {
    const [productName, setProductName] = useState('');
    const [payment, setPayment] = useState('kakaopay');
    const [paymentSuccess, setPaymentSuccess] = useState('');


    useEffect(() => {
        if (cartItems.length > 0) {
            setProductName(cartItems[0].pname);
        }
        console.log(itemQuantities)




    }, [cartItems,itemQuantities]);


    const handleModule = (e) => {
        const selectedPayment = e.target.value;
        setPayment(selectedPayment);
        setPaymentSuccess(false); // 새로운 결제 시도 시 결제 성공 상태 초기화
    };


    return (
        <div className='pay-card'>
            <div>결제 금액</div>
            <hr/>
            {
                cartItems.length === 1 ? (
                <div>{productName}</div>
                ):(
                cartItems.length === 0 ? (
                    <div>빈 장바구니</div>
                     ):(
                    <div>{productName}외 {cartItems.length - 1}개 상품</div>)
                
                )
            }
            
            <div>총 결제 금액: {totalPrice}원</div>
            <hr/>
         
            <input type="radio" name="payment" value="kakaopay" onChange={handleModule} checked="true"/>
            <img src="/image/kakaopay.png" alt="kakaopay" style={{ width: '50px', height: 'auto', position: 'relative', top: '2px' }} />
            <br />
            {payment === 'kakaopay' && <PayCartKakao setPaymentSuccess={setPaymentSuccess} totalPrice={totalPrice} productName={productName} cartItems={cartItems} itemQuantities={itemQuantities}/>}
        </div>
    );
};

export default CartPay;