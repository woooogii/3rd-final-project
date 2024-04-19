import React from 'react';
import './cart.css'

const CartPay = ({totalPrice}) => {

    

    return (
        <div className='pay-card'>
            <div>결제 금액: {totalPrice}</div>
            <button>구매</button>
        </div>
    );
};

export default CartPay;