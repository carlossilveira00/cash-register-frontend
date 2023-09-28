import React, { createContext, useContext, useEffect, useState } from "react";

const PromotionsContext = createContext();

export function usePromotons() {
  return useContext(PromotionsContext)
};

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState([]);
  const promotionsApiUrl = 'https://65143ced8e505cebc2eb025b.mockapi.io/promotions';

  const findApplicablePromotion = (cartItem) => {
    const promotionToBeApplied = promotions.find((promotion) => promotion.product_code === cartItem.product_code);
    return promotionToBeApplied
  };

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
  };

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

  const applyPromotion = (item) => {
    const promotion = findApplicablePromotion(item);
    if (promotion.promotion_type === "buy_x_get_x_free") {
      return applyBuyXGetXFree(item, promotion);

    } else if (promotion.promotion_type === "price_discount_per_quantity"){
      return applyPriceDiscountPerQuantity(item, promotion);

    } else if (promotion.promotion_type === "percentage_discount_per_quantity") {
      return applyPercentageDiscountPerQuantity(item, promotion)
    }
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

  const unapplyPromotion = (item) => {
    const promotion = findApplicablePromotion(item);
    if (promotion.promotion_type === "buy_x_get_x_free") {
      // If the quantity is bigger then 0 return unapplyBuyXGetXFree, this will check the quantity and update the cart item in accordance.
      return unapplyBuyXGetXFree(item, promotion);

    } else if (promotion.promotion_type === "price_discount_per_quantity"){
      return unapplyPriceDiscountPerQuantity(item, promotion);

    } else if (promotion.promotion_type === "percentage_discount_per_quantity") {
      return unapplyPercentageDiscountPerQuantity(item, promotion)
    };
  };


  useEffect(() => {
    // Fetch promotions from the API when the component mounts
    fetch(promotionsApiUrl)
      .then((response) => response.json())
      .then((data) => setPromotions(data))
      .catch((error) => console.error('Error fetching promotions:', error));
  }, []);

  return (
    <PromotionsContext.Provider value={{promotions,applyPromotion,unapplyPromotion,findApplicablePromotion}}>
      {children}
    </PromotionsContext.Provider>
  );
};
