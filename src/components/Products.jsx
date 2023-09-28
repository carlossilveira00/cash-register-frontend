import React from 'react'
import styled from 'styled-components'
import { useProdcuts } from '../context/ProductsContext';
import { usePromotions } from '../context/PromotionsContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const ProductsWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12 columns in total */
  grid-template-rows: auto 1fr; /* First row has a height of out and the second row occupies the rest of the wrapper. */
`;

const ProductsTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 24px;
  text-decoration: underline;
  grid-column: 2;
  font-weight: 800;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  grid-column: 2 / span 10;
  padding: 20px;
`;

export default function Products() {
  const products = useProdcuts();
  const cart = useCart();
  const promotions = usePromotions();

  return (
    <ProductsWrapper data-testid='ProductsWrapper'>
      <ProductsTitle data-testid='Title'>Products</ProductsTitle>
      <ProductsContainer>
        {
          products.map((product) => {
            // Find if there's any promotion for this product
            let promotion = promotions.promotions.find((promo) => promo.product_code === product.code)
            return(
              <ProductCard key={product.id} product={product} promotion={promotion} cart={cart}/>
            )
          })
        }
      </ProductsContainer>
    </ProductsWrapper>
  )
};
