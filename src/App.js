import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Home from './pages/Home';
import Products from './pages/Products';
import Order from './pages/Order';
import LiftGameScreen from './pages/LiftGameScreen';
import { CartContext } from './components/CartContext';
import NotFound from './pages/404';
import { AccessibilityWidget } from 'react-accessibility'


function App() {

  const [productsCartContext, setProductsCartContext] = useState([]);

  return (
    <CartContext.Provider value={{ productsCartContext, setProductsCartContext }}>
      <Router>
        <Header />
        <AccessibilityWidget />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Order />} />
          <Route path="/lift-game" element={<LiftGameScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Banner />
      </Router>
    </CartContext.Provider>
  );
}

export default App;