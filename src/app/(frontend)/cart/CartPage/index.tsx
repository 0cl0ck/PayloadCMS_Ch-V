import React from 'react'
import CartItem from '../CartItem'
import { Button } from '@/components/ui/button'

interface CartPageProps {
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
  onRemoveItem: (id: string) => void
  onQuantityChange: (id: string, quantity: number) => void
}

const CartPage: React.FC<CartPageProps> = ({ items, onRemoveItem, onQuantityChange }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onRemove={() => onRemoveItem(item.id)}
              onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
            />
          ))}
          <div className="flex justify-end mt-4">
            <Button variant="default">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
