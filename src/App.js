import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Order from './pages/Order';
import { CartContext } from './components/CartContext';

function App() {

  const [productsCartContext, setProductsCartContext] = useState([]);

  return (
    <CartContext.Provider value={{ productsCartContext, setProductsCartContext }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}

export default App;