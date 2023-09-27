import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

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

// If the item doesnt have discounted price, apply only the bold style.
const OldPrice = styled.span`
  ${props =>
    props.hasDiscountedPrice
      ? `
      text-decoration: line-through;
      margin-right: 10px;
      color: #888;
    `
      : 'font-weight: bold'};
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
  text-align: center;
`;

export default function Cart() {
  const cart = useCart();

  return (
    <CartContainer data-testid='Cart' onClick={(e) => e.stopPropagation()}>
      <ArrowUp></ArrowUp>
      <CartItemsContainer>
        {
          cart.cart.cart_items.map((item) => {
            return(
            <CartItem>
              <ItemImage src={item.product_image} alt={item.product_name} />
              <ItemDetails>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                  <ItemName>{item.product_name}</ItemName>
                  <span style={{ fontWeight: '800' }}>-</span>
                  <OldPrice hasDiscountedPrice={item.discounted_price > 0}>{item.undiscounted_price}$</OldPrice>
                  {
                    // If items has discounted price present it.
                    item.discounted_price > 0 &&
                    <TotalPrice>{item.discounted_price}$</TotalPrice>
                  }

                </div>
                <ItemQuantity>
                  <QuantityControl>
                    <QuantityButton>-</QuantityButton>
                    <span>{item.quantity}</span>
                    <QuantityButton onClick={() => cart.increaseCartItemQuantity(item)}>+</QuantityButton>
                  </QuantityControl>
                  {
                    // If items has free quantity present it.
                    item.promotion_free_quantity >= 1 &&
                    <FreeItems>+{item.promotion_free_quantity} free</FreeItems>
                  }
                </ItemQuantity>
              </ItemDetails>
            </CartItem>
            )
          })
        }
        <TotalValue>
          <span style={{fontWeight:'800'}}>Total:</span>
          <span>{cart.total}$</span>
        </TotalValue>
        <CheckoutButton>Checkout</CheckoutButton>
      </CartItemsContainer>
    </CartContainer>
  );
}
