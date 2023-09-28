import React, { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export function useProdcuts() {
  return useContext(ProductsContext)
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const productsApiUrl = 'http://127.0.0.1:3000/products';

  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetch(productsApiUrl)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
