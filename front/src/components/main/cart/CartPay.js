import React, { useEffect, useState } from 'react';
import Numeral from 'numeral';
import PayCartKakao from './cartPay/PayCartKakao';

import './cart.css'


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
            <h4 style={{color:'#6c757d'}}><b>결제 정보</b></h4>

            
            <div className='pay-product'>
                <p>선택 상품</p>

           
            {
                cartItems.length === 1 ? (
                <div><b>{productName}</b></div>
                ):(
                cartItems.length === 0 ? (
                    <div>빈 장바구니</div>
                     ):(
                    <div><b>{productName}</b><br/>
                    외 {cartItems.length - 1}개 상품</div>)
                
                )
            }
          
            </div>
            
            <div className='pay-method'>
                <p>결제 방법</p>
                <div className='each-method'>
                <input type="radio" name="payment" value="kakaopay" onChange={handleModule} checked="true"/>
                <img src="/image/kakaopay-black.png" alt="kakaopay" style={{ width: '50px', height: 'auto', position: 'relative', top: '2px', marginLeft:'5px' }} />
                </div>
            </div>


            <hr/>
            <div className='pay-total'>
                <p>총 결제 금액</p>
                
                <span>{Numeral(totalPrice).format(0.0)}원</span>
            </div>
        
         
           
            <br />
            {payment === 'kakaopay' && <PayCartKakao setPaymentSuccess={setPaymentSuccess} totalPrice={totalPrice} productName={productName} cartItems={cartItems} itemQuantities={itemQuantities}/>}
        </div>
    );
};

export default CartPay;