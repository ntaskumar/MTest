import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.dish_id === item.dish_id);
    if (existingItemIndex !== -1) {
      setCart((prevCart) =>
        prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.dish_id === item.dish_id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  const cartQtd = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartQtd }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
