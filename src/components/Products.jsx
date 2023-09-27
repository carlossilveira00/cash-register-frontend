import React, { useState } from 'react'
import styled from 'styled-components'
import { useProdcuts } from '../context/ProductsContext';
import { usePromotons } from '../context/PromotionsContext';

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

const ProductCard = styled.div`
  display: flex;
  margin: 10px 20px;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const ProductImage = styled.img`
  height: 200px;
  width: 80%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductPrice = styled.p`
  color: #5C8EF1;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityLabel = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const QuantityButton = styled.button`
  background-color: #E0E0E0;
  color: #333333;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const AddToCartButton = styled.button`
  background-color: #5C8EF1;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const PromotionBox = styled.div`
  width: 95%;
  padding: 8px 0px;
  background-color: #B6CCF7;
  color: #333333;
  text-align: center;
  border-radius: 5px;
  margin-top: -20px;
  position: relative;
  top: -20px; /* Place the promotion box at the top of the ProductCard */
  left: 48%;
  transform: translateX(-50%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  z-index: 2;
`;



export default function Products() {
  const products = useProdcuts();
  const promotions = usePromotons();
  console.log(products)
  console.log(promotions)
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ProductsWrapper data-testid='ProductsWrapper'>
      <ProductsTitle data-testid='Title'>Products</ProductsTitle>
      <ProductsContainer>
        {
          products.map((product) => {
            return(
              <ProductCard data-testid='ProductCard'>
              <PromotionBox>
                <p style={{margin: '0',marginBottom:'8px', textDecoration:'underline', fontWeight:'200'}}>Special Promotion:</p>
                <span style={{fontWeight:'600'}}>Buy 3 or more and get 70 off!!</span>
              </PromotionBox>
              <ProductImage data-testid='ProductImage' src='https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80' alt="Product" />
              <ProductInfo>
                <h4 data-testid='ProductTitle'>Product Title</h4>
                <p data-testid='ProductCode'>Product Code: ABC123</p>
                <ProductPrice data-testid='ProductPrice'>$11.23</ProductPrice>
                <QuantityControl>
                  <QuantityLabel>Quantity:</QuantityLabel>
                  <QuantityButton onClick={decreaseQuantity} data-testid='DecreaseButton'>-</QuantityButton>
                    <span style={{margin: '0px 5px'}} data-testid='ProductQuantity'>{quantity}</span>
                  <QuantityButton onClick={increaseQuantity} data-testid='IncreaseButton'>+</QuantityButton>
                </QuantityControl>
                <AddToCartButton>Add to Cart</AddToCartButton>
              </ProductInfo>
            </ProductCard>
            )
          })
        }
        {/* <ProductCard data-testid='ProductCard'>
          <PromotionBox>
            <p style={{margin: '0',marginBottom:'8px', textDecoration:'underline', fontWeight:'200'}}>Special Promotion:</p>
            <span style={{fontWeight:'600'}}>Buy 3 or more and get 70 off!!</span>
          </PromotionBox>
          <ProductImage data-testid='ProductImage' src='https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80' alt="Product" />
          <ProductInfo>
            <h4 data-testid='ProductTitle'>Product Title</h4>
            <p data-testid='ProductCode'>Product Code: ABC123</p>
            <ProductPrice data-testid='ProductPrice'>$11.23</ProductPrice>
            <QuantityControl>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityButton onClick={decreaseQuantity} data-testid='DecreaseButton'>-</QuantityButton>
                <span style={{margin: '0px 5px'}} data-testid='ProductQuantity'>{quantity}</span>
              <QuantityButton onClick={increaseQuantity} data-testid='IncreaseButton'>+</QuantityButton>
            </QuantityControl>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ProductInfo>
        </ProductCard> */}
      </ProductsContainer>
    </ProductsWrapper>
  )
}
