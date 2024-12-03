import React, { useState } from 'react';
import CartPage from './CartPage';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Product 1', price: 10.0, quantity: 1 },
    { id: '2', name: 'Product 2', price: 20.0, quantity: 2 },
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartPage
      items={cartItems}
      onRemoveItem={handleRemoveItem}
      onQuantityChange={handleQuantityChange}
    />
  );
};

export default Cart;
