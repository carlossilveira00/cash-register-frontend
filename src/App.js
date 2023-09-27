import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
    <ProductsProvider>
      <div>
        <Navbar></Navbar>
        <Products></Products>
      </div>
    </ProductsProvider>
  );
}

export default App;
