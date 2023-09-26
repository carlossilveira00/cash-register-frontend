import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders without errors', () => {
    render(<Navbar />);
    const navbar = screen.getByTestId('Navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByTestId('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the cart image', () => {
    render(<Navbar />);
    const cartIcon = screen.getByTestId('CartImage');
    expect(cartIcon).toBeInTheDocument();
  });

  it('allows clicking the cart icon', () => {
    render(<Navbar />);
    const cartIcon = screen.getByTestId('CartIcon');
    fireEvent.click(cartIcon);
  });

  it('initially, the Cart is not open', () => {
    render(<Navbar />);
    const cartElement = screen.queryByTestId('Cart');
    expect(cartElement).toBeNull();
  });

  it('clicking on Cart icon opens the Cart', () => {
    render(<Navbar />);
    const cartIconElement = screen.getByTestId('CartIcon');
    fireEvent.click(cartIconElement);

    const cartElement = screen.getByTestId('Cart');
    expect(cartElement).toBeInTheDocument();
  });

  it('clicking on Cart icon again closes the Cart', () => {
    render(<Navbar />);
    const cartIconElement = screen.getByTestId('CartIcon');
    fireEvent.click(cartIconElement); // Open the Cart
    fireEvent.click(cartIconElement); // Close the Cart

    const cartElement = screen.queryByTestId('Cart');
    expect(cartElement).toBeNull();
  });
});
