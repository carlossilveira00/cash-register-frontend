import React, { createContext, useContext, useEffect, useState } from "react";

const PromotionsContext = createContext();

export function usePromotons() {
  return useContext(PromotionsContext)
}

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState([]);
  const promotionsApiUrl = 'https://65143ced8e505cebc2eb025b.mockapi.io/promotions';

  useEffect(() => {
    // Fetch promotions from the API when the component mounts
    fetch(promotionsApiUrl)
      .then((response) => response.json())
      .then((data) => setPromotions(data))
      .catch((error) => console.error('Error fetching promotions:', error));
  }, []);

  return (
    <PromotionsContext.Provider value={promotions}>
      {children}
    </PromotionsContext.Provider>
  );
};
