import React from 'react';
import styled from 'styled-components';

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #5C8EF1;
  margin-left: 93%;
`;

const CartContainer = styled.div`
  position:absolute;
  margin-top: 40px;
`;

const CartItemsContainer = styled.div`
  background-color: white;
  width: 400px; /* Set a fixed width */
  padding: 10px;
  border: 1px solid #5C8EF1;
  box-shadow: 0px 5px 10px 2px rgba(49, 50, 54, 0.25);
`;

const CartItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #ECF2FD;
  margin-top: 10px;
  border-radius: 4px;
`;

const ItemImage = styled.img`
  width: 90px;
  height: 50px;
  object-fit: cover; /* Maintain aspect ratio for images */
  margin-right: 30px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h4`
  margin: 0;
`;

const ItemQuantity = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  margin-right: 10px;
  color: #888;
`;

const TotalPrice = styled.span`
  font-weight: bold;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #E0E0E0; /* Light gray background */
  color: #333333; /* Dark gray text color */
  border: none;
  /* padding: 5px 10px; */
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
`;

const FreeItems = styled.div`
  background-color: #5C8EF1;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  margin-left: 10px;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background-color: #5C8EF1;
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 20px;
  margin-top: 16px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
`;

const TotalValue = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-weight: bold;
  font-size: 18px;
  /* text-align: right; */
  text-align: center;
`;

export default function Cart() {
  return (
    <CartContainer data-testid='Cart' onClick={(e) => e.stopPropagation()}>
      <ArrowUp></ArrowUp>
      <CartItemsContainer>
        <CartItem>
          <ItemImage src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80" alt="" />
          <ItemDetails>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
              <ItemName>Strawberries</ItemName>
              <span style={{ fontWeight: '800' }}>-</span>
              <OldPrice>6.12$</OldPrice>
              <TotalPrice>3.11$</TotalPrice>
            </div>
            <ItemQuantity>
              <QuantityControl>
                <QuantityButton>-</QuantityButton>
                <span>1</span>
                <QuantityButton>+</QuantityButton>
              </QuantityControl>
              <FreeItems>+1 free</FreeItems>
            </ItemQuantity>
          </ItemDetails>
        </CartItem>
        <CartItem>
          <ItemImage src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80" alt="" />
          <ItemDetails>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
              <ItemName>Strawberries</ItemName>
              <span style={{ fontWeight: '800' }}>-</span>
              <OldPrice>6.12$</OldPrice>
              <TotalPrice>3.11$</TotalPrice>
            </div>
            <ItemQuantity>
              <QuantityControl>
                <QuantityButton>-</QuantityButton>
                <span>1</span>
                <QuantityButton>+</QuantityButton>
              </QuantityControl>
              <FreeItems>+1 free</FreeItems>
            </ItemQuantity>
          </ItemDetails>
        </CartItem>
        <CartItem>
          <ItemImage src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80" alt="" />
          <ItemDetails>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
              <ItemName>Strawberries</ItemName>
              <span style={{ fontWeight: '800' }}>-</span>
              <OldPrice>6.12$</OldPrice>
              <TotalPrice>3.11$</TotalPrice>
            </div>
            <ItemQuantity>
              <QuantityControl>
                <QuantityButton>-</QuantityButton>
                <span>1</span>
                <QuantityButton>+</QuantityButton>
              </QuantityControl>
              <FreeItems>+1 free</FreeItems>
            </ItemQuantity>
          </ItemDetails>
        </CartItem>
        <TotalValue>
          <span style={{fontWeight:'800'}}>Total:</span>
          <span>30$</span>
        </TotalValue>
        <CheckoutButton>Checkout</CheckoutButton>
      </CartItemsContainer>
    </CartContainer>
  );
}
