import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/state/cartContext';
import CartNotification from '@/components/CartNotification';

const ProductPage = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    CartNotification({ message: 'Item added to cart' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">${product.price.toFixed(2)}</p>
      <Button variant="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductPage;
