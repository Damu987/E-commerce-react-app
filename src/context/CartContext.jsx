// context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

    function addToCart(product, quantity = 1) {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }  // add quantity
            : item
        );
      }
      return [...prev, { product, quantity }];  //start with quantity
    });
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  }

  function updateQuantity(id, amount) {
    setCartItems(prev => prev.map(item =>
      item.product.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  }

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity, 
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// custom hook — usage in any component
export function useCart() {
  return useContext(CartContext);
}