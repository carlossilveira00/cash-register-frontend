import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { PromotionsProvider } from './context/PromotionsContext';

function App() {
  return (
    <CartProvider>
      <PromotionsProvider>
        <ProductsProvider>
          <div>
            <Navbar></Navbar>
            <Products></Products>
          </div>
        </ProductsProvider>
      </PromotionsProvider>
    </CartProvider>
  );
}

export default App;
