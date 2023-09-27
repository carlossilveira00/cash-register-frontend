import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({cart_id: null, total:10, cart_items:[]});
  const cartApiUrl = 'https://carts1.free.beeceptor.com/carts';

  const addItemToCart = (cartItem) => {
    if (cart.cart_items.filter((item) => item.product_id === cartItem.product.id).length >= 1) {
      const updatedCartItems = cart.cart_items.map((item) => {
        // If its the correct item.
        if (item.product_id === cartItem.product.id) {
          // Increment the quantity of the matching item.
          return {
            ...item,
            quantity: item.quantity + cartItem.quantity,
            undiscounted_price: (cartItem.product.price * (cartItem.quantity + item.quantity))
          };
        }
        // If its not the correct item then keep it unchanged.
        return item;
      });

      // Update the cart state.
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: updatedCartItems,
      }));
    } else {
      // Create a new Cart Item.
      const newCartItems = [...cart.cart_items, {
            cart_id: cart.cart_id,
            product_id: cartItem.product.id,
            product_image: cartItem.product.image_url,
            product_name: cartItem.product.name,
            product_price: cartItem.product.price,
            quantity: cartItem.quantity,
            undiscounted_price: (cartItem.product.price * cartItem.quantity),
            discounted_price: null,
            free_quantity: 0,
            promotion_id: null,
            promotions_status: 'not applied'
      }];
      // Update the Cart State.
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: newCartItems,
      }));

    }
  };

  const increaseCartItemQuantity = (cartItem) => {
    const updatedCartItems = cart.cart_items.map((item) => {
      // If its the correct item.
      if (item.product_id === cartItem.product_id) {
        // Increment the quantity of the matching item by 1.
        console.log(cartItem.product_price)
        return {
          ...item,
          quantity: item.quantity + 1,
          undiscounted_price: (cartItem.product_price * (item.quantity + 1))
        };
      }
      // If its not the correct item then keep it unchanged.
      return item;
    });

    // Update the cart state.
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: updatedCartItems,
    }));
  };

  const decreaseCartItemQuantity = (cartItem) => {
    const updatedCartItems = cart.cart_items.map((item) => {
      // If its the correct item.
      if (item.product_id === cartItem.product_id) {
        // Decrease the quantity of the matching item by 1.
        const updatedQuantity = item.quantity - 1
        // If the quantity is equal to 0 return null
        if (updatedQuantity === 0) {
          return null
        }

        return {
          ...item,
          quantity: updatedQuantity,
          undiscounted_price: (cartItem.product_price * updatedQuantity)
        };
      }
      // If its not the correct item then keep it unchanged.
      return item;
      // Filter by Boolean values, this way the item you returned null will be left out of the cart_items
    }).filter(Boolean);

  // Update the cart state.
  setCart((prevCart) => ({
    ...prevCart,
    cart_items: updatedCartItems,
  }));
};

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
    <CartContext.Provider value={{cart, addItemToCart, increaseCartItemQuantity, decreaseCartItemQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
