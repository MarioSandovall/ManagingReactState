import React from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Produts from './Products'
import Detail from './Detail.class'
import Cart from './Cart'
import Checkout from './Checkout.class';

import { useCart } from './cartContext';

import "./App.css";

export default function App() {
  const { dispatch } = useCart();

  return (
    < >
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Wealcome to Carved Rock Fitness</h1>} />
            <Route
              path="/cart"
              element={<Cart />} />
            <Route path="/:category" element={<Produts />} />
            <Route
              path="/:category/:id"
              element={<Detail />} />
            <Route
              path="checkout"
              element={<Checkout dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
