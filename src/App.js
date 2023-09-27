import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { ProductsProvider } from './context/ProductsContext';
import { PromotionsProvider } from './context/PromotionsContext';

function App() {
  return (
    <PromotionsProvider>
      <ProductsProvider>
        <div>
          <Navbar></Navbar>
          <Products></Products>
        </div>
      </ProductsProvider>
    </PromotionsProvider>
  );
}

export default App;
