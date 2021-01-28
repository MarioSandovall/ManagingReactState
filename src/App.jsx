import React from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Produts from './Products'
import Detail from './Detail'
import Cart from './Cart'


import "./App.css";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Wealcome to Carved Rock Fitness</h1>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category" element={<Produts />} />
            <Route path="/:category/:id" element={<Detail />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
