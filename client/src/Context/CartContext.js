import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await axios.get("http://localhost:8000/api/cart");
        setCartProducts(cartResponse.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartProducts, loading }}>
      {children}
    </CartContext.Provider>
  );
};
