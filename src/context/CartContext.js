import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({cart_id: null, total:10, cart_items:[]});
  const cartApiUrl = 'https://carts.free.beeceptor.com/carts';

  useEffect(() => {
    // Fetch cart from the API when the component mounts. If there's already an cart_id no need to fetch it again.
    if (cart.cart_id == null) {
      fetch(cartApiUrl)
        .then((response) => response.json())
        // Only update the cart_id, since in the beggining the cart is emtpy.
        .then((data) => setCart((prevCart) => ({ ...prevCart, cart_id: data.cart_id })))
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, [cart.cart_id]);

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};
