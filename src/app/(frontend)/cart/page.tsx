import React, { useContext } from 'react';
import CartPage from './CartPage';
import { CartContext } from '@/state/cartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  return (
    <CartPage
      items={cartItems}
      onRemoveItem={removeFromCart}
      onQuantityChange={updateCartItemQuantity}
    />
  );
};

export default Cart;
