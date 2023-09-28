import React, { createContext, useContext, useEffect, useState } from "react";

const PromotionsContext = createContext();

export function usePromotons() {
  return useContext(PromotionsContext)
}

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState([]);
  const promotionsApiUrl = 'https://65143ced8e505cebc2eb025b.mockapi.io/promotions';

  const findApplicablePromotion = (cartItem) => {
    const promotionToBeApplied = promotions.find((promotion) => promotion.product_code === cartItem.product_code);
    return promotionToBeApplied
  }
  const applyPromotionRules = (cartItem) => {
    const promotionToBeApplied = promotions.find((promotion) => promotion.product_code === cartItem.product_code);
    cartItem.quantity = 10;
    return cartItem
    if (promotionToBeApplied != null) {
      if (promotionToBeApplied.promotion_type === 'buy_x_get_x_free') {
        cartItem.quantity = 10;
        return cartItem
        // const timesPromotionCanBeApplied = cartItem.quantity / promotionToBeApplied.min_quantity;

        // return({
        //   ...cartItem,
        //   free_quantity: timesPromotionCanBeApplied * promotionToBeApplied.promotion_free_quantity,
        //   undiscounted_price: (cartItem.quantity + cartItem.free_quantity) * cartItem.product_price,
        //   discounted_price: cartItem.quantity * cartItem.product_price,
        //   promotion_id: promotionToBeApplied.id,
        //   promotion_status: 'applied'
        // })
      }
    } else{
      console.log('There is no promotion to be applied..')
    }
  }
  // switch (promotionToBeApplied.promotion_type) {
  //   case 'buy_x_get_x_free':
  //     const timesPromotionCanBeApplied = cartItem.quantity / promotionToBeApplied.min_quantity;

  //     return({
  //       ...cartItem,
  //       free_quantity: timesPromotionCanBeApplied * promotionToBeApplied.promotion_free_quantity,
  //       undiscounted_price: (cartItem.quantity + cartItem.free_quantity) * cartItem.product_price,
  //       discounted_price: cartItem.quantity * cartItem.product_price,
  //       promotion_id: promotionToBeApplied.id,
  //       promotion_status: 'applied'
  //     })
  //   case 'price_discount_per_quantity':
  //     console.log(promotionToBeApplied.title)
  //     break;
  //   case 'percentage_discount_per_quantity':
  //     console.log(promotionToBeApplied.title)
  //     break;
  //   default:
  //     console.error('Unsupported promotion type.');
  //     return cartItem;
  // }

  const applyBuyXGetXFree = (promotion,cartItem) => {
    cartItem.quantity = 10;
    return cartItem
    // const timesPromotionCanBeApplied = cartItem.quantity / promotion.min_quantity;

    // return({
    //   ...cartItem,
    //   free_quantity: timesPromotionCanBeApplied * promotion.promotion_free_quantity,
    //   undiscounted_price: (cartItem.quantity + cartItem.free_quantity) * cartItem.product_price,
    //   discounted_price: cartItem.quantity * cartItem.product_price,
    //   promotion_id: promotion.id,
    //   promotion_status: 'applied'
    // })
    // cartItem.free_quantity = timesPromotionCanBeApplied * promotion.promotion_free_quantity
    // cartItem.undiscounted_price = (cartItem.quantity + cartItem.free_quantity) * cartItem.product_price;
    // cartItem.discounted_price = cartItem.quantity * cartItem.product_price;
    // cartItem.promotion_id = promotion.id
    // cartItem.promotion_status = "applied"
    // console.log(cartItem)
  };

  useEffect(() => {
    // Fetch promotions from the API when the component mounts
    fetch(promotionsApiUrl)
      .then((response) => response.json())
      .then((data) => setPromotions(data))
      .catch((error) => console.error('Error fetching promotions:', error));
  }, []);

  return (
    <PromotionsContext.Provider value={{promotions,applyPromotionRules,findApplicablePromotion}}>
      {children}
    </PromotionsContext.Provider>
  );
};
