import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartProvider, { CartContext } from '../state/cartContext';
import CartPage from '../app/(frontend)/cart/CartPage';

const renderWithCartProvider = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <CartProvider {...providerProps}>{ui}</CartProvider>,
    renderOptions
  );
};

describe('Cart functionality', () => {
  test('adds products to the cart', () => {
    const providerProps = {
      value: {
        cartItems: [],
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateCartItemQuantity: jest.fn(),
      },
    };

    renderWithCartProvider(<CartPage items={[]} onRemoveItem={() => {}} onQuantityChange={() => {}} />, { providerProps });

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(providerProps.value.addToCart).toHaveBeenCalled();
  });

  test('updates quantities of the same product', () => {
    const providerProps = {
      value: {
        cartItems: [{ id: '1', name: 'Product 1', price: 10.0, quantity: 1 }],
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateCartItemQuantity: jest.fn(),
      },
    };

    renderWithCartProvider(<CartPage items={providerProps.value.cartItems} onRemoveItem={() => {}} onQuantityChange={() => {}} />, { providerProps });

    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(providerProps.value.updateCartItemQuantity).toHaveBeenCalledWith('1', 2);
  });

  test('retains cart state on page reloads or navigation', () => {
    const providerProps = {
      value: {
        cartItems: [{ id: '1', name: 'Product 1', price: 10.0, quantity: 1 }],
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateCartItemQuantity: jest.fn(),
      },
    };

    renderWithCartProvider(<CartPage items={providerProps.value.cartItems} onRemoveItem={() => {}} onQuantityChange={() => {}} />, { providerProps });

    expect(localStorage.getItem('cart')).toBe(JSON.stringify(providerProps.value.cartItems));
  });
});
