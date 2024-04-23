import React, { useEffect, useState } from 'react';
import './cart.css'

const CartPay = ({totalPrice, cartItems}) => {
    const [productName, setProductName] = useState('');

    useEffect(() => {
        if (cartItems.length > 0) {
            setProductName(cartItems[0].pname);
        }
    }, [cartItems]);

    return (
        <div className='pay-card'>
            <div>결제 금액</div>
            <hr/>
            <div>{productName}외 {cartItems.length - 1}개 상품</div>
            <div>총 결제 금액: {totalPrice}</div>
            <hr/>
            <button className="btn btn-primary" type="button">구매</button>
        </div>
    );
};

export default CartPay;