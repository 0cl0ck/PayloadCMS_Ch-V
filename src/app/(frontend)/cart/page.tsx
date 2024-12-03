'use client'
import React, { useContext } from 'react'
import CartPage from './CartPage'
import { CartContext } from '@/state/cartContext'

const Cart = () => {
  const cartContext = useContext(CartContext)

  if (!cartContext) {
    return <div>Loading...</div>
  }

  const { cartItems, removeFromCart, updateCartItemQuantity } = cartContext

  return (
    <CartPage
      items={cartItems}
      onRemoveItem={removeFromCart}
      onQuantityChange={updateCartItemQuantity}
    />
  )
}

export default Cart
