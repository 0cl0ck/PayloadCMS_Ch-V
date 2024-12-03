import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 mr-4"
        />
        <Button variant="destructive" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
