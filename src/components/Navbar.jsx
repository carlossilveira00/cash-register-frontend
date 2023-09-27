import React, { useState } from 'react';
import styled from 'styled-components';
import Cart_Icon from '../assets/CartIcon.png'
import Cart from './Cart'
import { useCart } from '../context/CartContext';

const StyledNavbar = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12 columns in total */
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #FFF;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
`;

const LogoContainer = styled.div`
  grid-column: 2 / span 5;
  display: flex;
  justify-content: flex-start;
`;

const Logo = styled.img`
  width: 120px;
`;

const CartIcon = styled.div`
  grid-column: 7 / span 5;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const CartImage = styled.img`
  width: 40px;
`;

export default function Navbar() {
  const cart = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <StyledNavbar data-testid="Navbar">
      <LogoContainer>
        <Logo src='https://amenitiz.com/wp-content/uploads/2022/09/WORDMARK-AMENITIZ-BLUE-1.svg' data-testid="Logo"></Logo>
      </LogoContainer>
      <CartIcon data-testid='CartIcon' onClick={toggleCart}>
        <CartImage src={Cart_Icon} alt="Cart" data-testid='CartImage'></CartImage>
        {isCartOpen && <Cart cart={cart}/>}
      </CartIcon>
    </StyledNavbar>
  )
}
