import React from 'react';
import CartItem from './CartItem';

const CartList = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.pid} item={item} />
      ))}
    </div>
  );
};

export default CartList;