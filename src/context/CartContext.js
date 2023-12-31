import React, { createContext, useContext, useEffect, useState } from "react";
import { usePromotions } from "./PromotionsContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({cart_id: null, total:0, cart_items:[]});
  const promotions = usePromotions();
  const cartApiUrl = 'http://127.0.0.1:3000/cart/checkout';

  const updateCartTotal = () => {
    const updatedTotal = cart.cart_items.reduce((total,cart_item)=>{
      const itemCost = cart_item.discounted_price || cart_item.undiscounted_price

      return total + (itemCost * 1)
    }, 0);

    setCart((prevCart) => ({
      ...prevCart,
      total: updatedTotal.toFixed(2)
    }));
  };

  const handleCheckout = async () => {
    const response = await fetch(cartApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cart: cart}),
      });

      if (response.ok) {
        const responseData = await response.json();
        window.alert(responseData.message)
        setCart({cart_id: null, total:0, cart_items:[]})
      } else {
        window.alert(response.json().message)
      }
  };

  const addItemToCart = (cartItem) => {
    // Checks to see if the item is already in cart.
    if (cart.cart_items.filter((item) => item.product_id === cartItem.product.id).length >= 1) {
      const updatedCartItems = cart.cart_items.map((item) => {
        // If its the item you want to updated change quantity and apply promotions.
        if (item.product_id === cartItem.product.id) {
          item.quantity = cartItem.quantity + item.quantity;

          return promotions.applyPromotion(item);
        };

        // If its not the correct item then keep it unchanged.
        return item;
      });

      // Update the cart state.
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: updatedCartItems,
      }));
    } else {
      // Create new cartItem and
      let newCartItem = {
        cart_id: cart.cart_id,
        product_id: cartItem.product.id,
        product_image: cartItem.product.image_url,
        product_code: cartItem.product.code,
        product_name: cartItem.product.name,
        product_price: cartItem.product.price,
        quantity: cartItem.quantity,
        undiscounted_price: (cartItem.product.price * cartItem.quantity),
        discounted_price: null,
        free_quantity: 0,
        promotion_id: null,
        promotion_status: 'not applied'
      };

      // Apply promotion if it meets the requirements and add the new cartItem to cartItems.
      const updatedCartItems = [...cart.cart_items, promotions.applyPromotion(newCartItem)];
      // Update the Cart State.
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: updatedCartItems,
      }));
    };
    updateCartTotal();
  };

  const increaseCartItemQuantity = (cartItem) => {
    const updatedCartItems = cart.cart_items.map((item) => {
      // If its the correct item you want to increase quantity.
      if (item.product_id === cartItem.product_id) {
        // Increment quantity by 1.
        item.quantity = item.quantity + 1;

        return promotions.applyPromotion(item)
      } else {
        // If its not the correct item then keep it unchanged.
        return item;
      }
    });
    // Update the cart state.
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: updatedCartItems,
    }));
  };

  const deleteItemFromCart = (cartItem) => {
    // Filter cart to not include the item you want to delete.
    const updatedCartItems = cart.cart_items.filter((item) => item.product_id !== cartItem.product_id)
    // Update the cart state.
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: updatedCartItems,
    }));
  };

  const decreaseCartItemQuantity = (cartItem) => {
    const updatedCartItems = cart.cart_items.map((item) => {
      // If its the item you want to updated change quantity and unapply promotions.
      if (item.product_id === cartItem.product_id) {
        item.quantity = item.quantity - 1;

        // return null in case the item quantity is equal to zero.
        if (item.quantity === 0) {
          return null
        };

        return promotions.unapplyPromotion(item)
      } else {
        // If its not the correct item then keep it unchanged.
        return item;
      }
    }).filter(Boolean);

  // Update the cart state.
  setCart((prevCart) => ({
    ...prevCart,
    cart_items: updatedCartItems,
  }));
  };
  // Updated the total value of cart when cart.cart_items change.
  useEffect(()=>{updateCartTotal()},[cart.cart_items]);


  return (
    <CartContext.Provider value={{cart, addItemToCart, increaseCartItemQuantity, decreaseCartItemQuantity, deleteItemFromCart, handleCheckout}}>
      {children}
    </CartContext.Provider>
  );
};
