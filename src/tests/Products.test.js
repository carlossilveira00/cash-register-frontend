import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../components/Products';

describe('Products Component', () =>{
  it('renders without errors', () => {
    render(<Products/>);
    const productsWrapper = screen.getByTestId('ProductsWrapper');
    expect(productsWrapper).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Products/>);
    const title = screen.getByTestId('Title');
    expect(title).toBeInTheDocument();
  });

  it('renders product card', () => {
      render(<Products/>);
      const productCard = screen.getByTestId('ProductCard');
      expect(productCard).toBeInTheDocument();
    });

  // This tests need addressing since I'm not sure how to adress a child of the Product Card.

  // it('renders product image', () => {
  //   render(<Products/>);
  //   const productQuantity = screen.getByTestId('ProductCard').querySelector('[data-testid="ProductQuantity"]');
  //   const productImage = screen.getByTestId('ProductImage');
  //   expect(productImage).toBeInTheDocument();
  // });

  // it('renders product title', () => {
  //   render(<Products/>);
  //   const productTitle = screen.getByTestId('ProductTitle');
  //   expect(productTitle).toBeInTheDocument();
  // });

  // it('renders product code', () => {
  //   render(<Products/>);
  //   const productCode = screen.getByTestId('ProductCode');
  //   expect(productCode).toBeInTheDocument();
  // });

  // it('renders product price', () => {
  //   render(<Products/>);
  //   const productPrice = screen.getByTestId('ProductPrice');
  //   expect(productPrice).toBeInTheDocument();
  // });

  // it('clicking on + button increases quantity.', () => {
  //   render(<Products/>);
  //   const productQuantity = screen.getByTestId('ProductQuantity')
  //   const increaseButton = screen.getByTestId('IncreaseButton');

  //   fireEvent.click(increaseButton); // Click 1 time to increase quantity by 1.

  //   expect(productQuantity.textContent).toBe('2');
  // });

  // it('clicking on - button dont decreases quantity bellow 1', () => {
  //   render(<Products/>);
  //   const productQuantity = screen.getByTestId('ProductQuantity')
  //   const increaseButton = screen.getByTestId('IncreaseButton');
  //   const decreaseButton = screen.getByTestId('DecreaseButton');

  //   fireEvent.click(increaseButton); // Click 1 time to increase quantity by 1.
  //   fireEvent.click(decreaseButton); // Click 1 time to decrease quantity by 1.
  //   fireEvent.click(decreaseButton); // Click 1 time to decrease quantity by another 1.

  //   expect(productQuantity.textContent).toBe('1');
  // });

  // it('clicking on - button decreases quantity.', () => {
  //   render(<Products/>);
  //   const productQuantity = screen.getByTestId('ProductQuantity')
  //   const increaseButton = screen.getByTestId('IncreaseButton');
  //   const decreaseButton = screen.getByTestId('DecreaseButton');

  //   fireEvent.click(increaseButton); // Click 1 time to increase quantity by 1.
  //   fireEvent.click(increaseButton); // Click 1 time to increase quantity by 1.
  //   fireEvent.click(decreaseButton); // Click 1 time to decrease quantity by another 1.

  //   expect(productQuantity.textContent).toBe('2');
  // });

});
