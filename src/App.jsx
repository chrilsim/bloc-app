import Navbar from './component/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './App.css'
import Product_Detail from './pages/product-detail';
import Food from './pages/food';
import Mart from './pages/mart';
import Khmer from './pages/khmer';
import Korean from './pages/korean';
import SearchPage from './pages/Search';

import { CartProvider } from "./context/CartContext";
function App() {


  return (
   <CartProvider>
      <BrowserRouter>
        <div className="flex-col">
          <Navbar />

          <div className="max-w-[1500px] m-auto p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product-detail/:id" element={<Product_Detail />} />

              <Route path="/food" element={<Food />}>
                <Route path="khmer" element={<Khmer />} />
                <Route path="korean" element={<Korean />} />
              </Route>

              <Route path="/mart" element={<Mart />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
