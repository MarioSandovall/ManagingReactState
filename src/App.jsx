import React, { useReducer, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Produts from './Products'
import Detail from './Detail'
import Cart from './Cart'
import Checkout from './Checkout';

import cartReducer from './cartReducer';

import "./App.css";

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart") ?? []);
} catch {
  console.error("The cart could not be parsed into JSON");
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Wealcome to Carved Rock Fitness</h1>} />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />} />
            <Route path="/:category" element={<Produts />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />} />
            <Route
              path="checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
