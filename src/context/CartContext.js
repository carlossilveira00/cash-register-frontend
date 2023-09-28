import React, { createContext, useContext, useEffect, useState } from "react";
import { usePromotons } from "./PromotionsContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({cart_id: null, total:10, cart_items:[]});
  const promotions = usePromotons();
  const cartApiUrl = 'https://carts1.free.beeceptor.com/carts';

  function parseFraction(fraction) {
    const parts = fraction.split('/');
    if (parts.length === 2) {
      // In case the discount is a fraction (ex: 2/3) return discount in decimal.
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    } else {
      // In case the discount is a float (ex: 25.00) return discount in decimal.
      const floatVal = parseFloat(fraction);
      if (!isNaN(floatVal)) {
        return floatVal / 100;
      }
    }
    return null; // Invalid fraction or float
  }

  const applyBuyXGetXFree = (item, promotion) => {
    if (item.quantity >= promotion.min_quantity) {
      const timesPromotionCanBeApplied = Math.floor(item.quantity / promotion.min_quantity);
      item.free_quantity = timesPromotionCanBeApplied * promotion.promotion_free_quantity
      return({
        ...item,
        undiscounted_price: (item.quantity + item.free_quantity) * item.product_price,
        discounted_price: item.quantity * item.product_price,
        promotion_id: promotion.id,
        promotion_status: 'applied'
      })
    } else {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price
      }
    }
  };

  const applyPriceDiscountPerQuantity = (item, promotion) => {
    if (item.quantity >= promotion.min_quantity) {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price,
        discounted_price : item.quantity * promotion.discount,
        promotion_id: promotion.id,
        promotion_status: 'applied'
      }
    } else {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price
      }
    }
  };

  const applyPercentageDiscountPerQuantity = (item, promotion) => {
    if (item.quantity >= promotion.min_quantity) {
      const discount = parseFraction(promotion.discount)

      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price,
        discounted_price : (item.quantity * item.product_price * discount).toFixed(2),
        promotion_id: promotion.id,
        promotion_status: 'applied'
      }
    } else {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price
      }
    }
  };

  const addItemToCart = (cartItem) => {
    if (cart.cart_items.filter((item) => item.product_id === cartItem.product.id).length >= 1) {
      const updatedCartItems = cart.cart_items.map((item) => {
        // If its the correct item.
        const promotion = promotions.findApplicablePromotion(item);

        if (item.product_id === cartItem.product.id && item.product_code === promotion.product_code && promotion.promotion_type === "buy_x_get_x_free") {
          // Update item quantity
          item.quantity = cartItem.quantity + item.quantity;

          return applyBuyXGetXFree(item, promotion);

        } else if (item.product_id === cartItem.product.id && item.product_code === promotion.product_code && promotion.promotion_type === "price_discount_per_quantity"){
          // Update item quantity
          item.quantity = cartItem.quantity + item.quantity;

          return applyPriceDiscountPerQuantity(item, promotion);

        } else if (item.product_id === cartItem.product.id && item.product_code === promotion.product_code && promotion.promotion_type === "percentage_discount_per_quantity") {
          // Update item quantity
          item.quantity = cartItem.quantity + item.quantity;

          return applyPercentageDiscountPerQuantity(item, promotion)
        }
        // If its not the correct item then keep it unchanged.
        return item;
      });

      // Update the cart state.
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: updatedCartItems,
      }));
      console.log(cart)
    } else {
      // If there's no cartItem with the produc_id you're adding, create a new Cart Item.
      const newCartItems = [...cart.cart_items, {
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
        const promotion = promotions.findApplicablePromotion(item);

        if (item.product_code === promotion.product_code && promotion.promotion_type === "buy_x_get_x_free") {
          // Increment item quantity by 1.
          item.quantity = item.quantity + 1;

          return applyBuyXGetXFree(item, promotion);

        } else if (item.product_code === promotion.product_code && promotion.promotion_type === "price_discount_per_quantity"){
          // Increment item quantity by 1.
          item.quantity = item.quantity + 1;

          return applyPriceDiscountPerQuantity(item, promotion);

        } else if (item.product_code === promotion.product_code && promotion.promotion_type === "percentage_discount_per_quantity") {
          // Increment item quantity by 1.
          item.quantity = item.quantity + 1;

          return applyPercentageDiscountPerQuantity(item, promotion)
        }
      };
      // If its not the correct item then keep it unchanged.
      return item;
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

  const unapplyBuyXGetXFree = (item, promotion) => {
    if (item.quantity < promotion.min_quantity) {
      item.free_quantity = 0
      return({
        ...item,
        undiscounted_price: (item.quantity + item.free_quantity) * item.product_price,
        discounted_price: 0,
        promotion_id: null,
        promotion_status: 'not applied'
      })
    } else {
      // If there's still enough quantity to the promotion be applied, update the item in accordance with the promotion.
      return applyBuyXGetXFree(item, promotion);
    }
  };

  const unapplyPriceDiscountPerQuantity = (item, promotion) => {
    if (item.quantity < promotion.min_quantity) {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price,
        discounted_price : null,
        promotion_id: null,
        promotion_status: 'not applied'
      }
    } else {
      return applyPriceDiscountPerQuantity(item, promotion);
    }
  };

  const unapplyPercentageDiscountPerQuantity = (item, promotion) => {
    if (item.quantity < promotion.min_quantity) {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: item.quantity * item.product_price,
        discounted_price : null,
        promotion_id: null,
        promotion_status: 'not applied'
      }
    } else {
      return applyPercentageDiscountPerQuantity(item, promotion);
    }
  };

  const decreaseCartItemQuantity = (cartItem) => {
    const updatedCartItems = cart.cart_items.map((item) => {
      // If its the correct item.
      if (item.product_id === cartItem.product_id) {
        // Find promotion applicable to item.
        const promotion = promotions.findApplicablePromotion(item);

        if (item.product_code === promotion.product_code && promotion.promotion_type === "buy_x_get_x_free") {
          // Decrease item quantity by 1.
          item.quantity = item.quantity - 1;

          // If the quantity is 0 then return null so this item can be deleted from the cart.
          if (item.quantity === 0) {
            return null
          };

          // If the quantity is bigger then 0 return unapplyBuyXGetXFree, this will check the quantity and update the cart item in accordance.
          return unapplyBuyXGetXFree(item, promotion);

        } else if (item.product_code === promotion.product_code && promotion.promotion_type === "price_discount_per_quantity"){
          // Decrease item quantity by 1.
          item.quantity = item.quantity - 1;

          // If the quantity is 0 then return null so this item can be deleted from the cart.
          if (item.quantity === 0) {
            return null
          };

          return unapplyPriceDiscountPerQuantity(item, promotion);

        } else if (item.product_code === promotion.product_code && promotion.promotion_type === "percentage_discount_per_quantity") {
          // Decrease item quantity by 1.
          item.quantity = item.quantity - 1;

          return unapplyPercentageDiscountPerQuantity(item, promotion)
        }
      };
      // If its not the correct item then keep it unchanged.
      return item;
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
    <CartContext.Provider value={{cart, addItemToCart, increaseCartItemQuantity, decreaseCartItemQuantity, deleteItemFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
