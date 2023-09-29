import React, { createContext, useContext, useEffect, useState } from "react";

const PromotionsContext = createContext();

export function usePromotions() {
  return useContext(PromotionsContext)
};

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState([]);
  const promotionsApiUrl = 'http://127.0.0.1:3000/promotions';

  const findApplicablePromotion = (cartItem) => {
    const promotionToBeApplied = promotions.find((promotion) => promotion.product_code === cartItem.product_code);
    return promotionToBeApplied
  };

  function parseFraction(fraction) {
    // Fraction is already in decimal
    if (fraction < 1 ){
      return fraction
    }
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
    // If there's enough quantity to apply the promotion
    if (item.quantity >= promotion.min_quantity) {
      // Calculate how many times this promotion can be applied, must be set to floor because you only want to apply it 1,2,3 times and not 1.5 times.
      const timesPromotionCanBeApplied = Math.floor(item.quantity / promotion.min_quantity);
      // Set the free quantity for how many times the promotion can be applied.
      item.free_quantity = timesPromotionCanBeApplied * promotion.promotion_free_quantity
      return({
        ...item,
        undiscounted_price: ((item.quantity + item.free_quantity) * item.product_price).toFixed(2),
        discounted_price: (item.quantity * item.product_price).toFixed(2),
        promotion_id: promotion.id,
        promotion_status: 'applied'
      })
    } else {
      // If there's not enough quantity return the item with the calculated undiscounted_price.
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2)
      }
    }
  };

  const applyPriceDiscountPerQuantity = (item, promotion) => {
    // If there's enough quantity to apply the promotion
    if (item.quantity >= promotion.min_quantity) {
      // Calculate the discounted_price with the discount from the promotion.
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2),
        discounted_price : (item.quantity * promotion.discount).toFixed(2),
        promotion_id: promotion.id,
        promotion_status: 'applied'
      }
    } else {
      // If there's not enough quantity return the item with the calculated undiscounted_price.
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2)
      }
    }
  };

  const applyPercentageDiscountPerQuantity = (item, promotion) => {
    // If there's enough quantity to apply the promotion
    if (item.quantity >= promotion.min_quantity) {
      // Get the discount to decimal using the parseFraction function.
      const discount = parseFraction(promotion.discount)

      // Calculate the discounted_price by multiplying the quantity by the product_price and the decimal value of the discount.
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2),
        discounted_price : (item.quantity * item.product_price * discount).toFixed(2),
        promotion_id: promotion.id,
        promotion_status: 'applied'
      }
    } else {
      // If there's not enough quantity return the item with the calculated undiscounted_price.
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2)
      }
    }
  };

  const applyPromotion = (item) => {
    // Finds the correct promotion for the item
    const promotion = findApplicablePromotion(item);

    // If there's no promotion for the item, return the item
    if (promotion == null) {
      return item
    };

    // Checks the promotion_type and calls the correct apply method based on the promotion_type.
    if (promotion.promotion_type === "buy_x_get_x_free") {
      return applyBuyXGetXFree(item, promotion);

    } else if (promotion.promotion_type === "price_discount_per_quantity"){
      return applyPriceDiscountPerQuantity(item, promotion);

    } else if (promotion.promotion_type === "percentage_discount_per_quantity") {
      return applyPercentageDiscountPerQuantity(item, promotion);
    };
  };

  const unapplyBuyXGetXFree = (item, promotion) => {
    // If the item quantity doesnt meet the requirements for the promotions to be applied, set the discounted price to null and calculated the correct undiscounted_price.
    if (item.quantity < promotion.min_quantity) {
      item.free_quantity = 0
      return({
        ...item,
        undiscounted_price: ((item.quantity + item.free_quantity) * item.product_price).toFixed(2),
        discounted_price: null,
        promotion_id: null,
        promotion_status: 'not applied'
      })
    } else {
      // If there's still enough quantity to the promotion be applied, update the item in accordance with the promotion.
      return applyBuyXGetXFree(item, promotion);
    }
  };

  const unapplyPriceDiscountPerQuantity = (item, promotion) => {
    // If the item quantity doesnt meet the requirements for the promotions to be applied, set the discounted price to null and calculated the correct undiscounted_price.
    if (item.quantity < promotion.min_quantity) {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2),
        discounted_price : null,
        promotion_id: null,
        promotion_status: 'not applied'
      }
    } else {
      // If there's still enough quantity to the promotion be applied, update the item in accordance with the promotion.
      return applyPriceDiscountPerQuantity(item, promotion);
    }
  };

  const unapplyPercentageDiscountPerQuantity = (item, promotion) => {
    // If the item quantity doesnt meet the requirements for the promotions to be applied, set the discounted price to null and calculated the correct undiscounted_price.
    if (item.quantity < promotion.min_quantity) {
      return{
        ...item,
        cart_id: 1,
        undiscounted_price: (item.quantity * item.product_price).toFixed(2),
        discounted_price : null,
        promotion_id: null,
        promotion_status: 'not applied'
      }
    } else {
      // If there's still enough quantity to the promotion be applied, update the item in accordance with the promotion.
      return applyPercentageDiscountPerQuantity(item, promotion);
    }
  };

  const unapplyPromotion = (item) => {
    const promotion = findApplicablePromotion(item);
    // If there's no promotion for the item, return the item
    if (promotion == null) {
      return item;
    };

    // Checks the promotion_type and calls the correct unapply method based on the promotion_type.
    if (promotion.promotion_type === "buy_x_get_x_free") {
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
