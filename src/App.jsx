import React, {useState, useEffect} from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Produts from './Products'
import Detail from './Detail'
import Cart from './Cart'


import "./App.css";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") ?? []);
    } catch  {
      console.error("The cart could not be parsed into JSON");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(id, sku){
    setCart((items)=> {
      const itemInCart = items.find((i)=> i.sku === sku);

      if(itemInCart){
        return items.map(item=> item.sku === sku 
          ? {...item, quantity: item.quantity +1 }
          : item);
      }else{
        return [...items, { id, sku, quantity:1 }]
      }

    });
  }

  function updateQuantity(sku, quantity){
    setCart((items)=> {
        if(quantity === 0){
          return items.filter(i=> i.sku !== sku);
        }

        return items.map((i)=> i.sku === sku
        ? {...i, quantity }
        : i);
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Wealcome to Carved Rock Fitness</h1>} />
            <Route 
              path="/cart" 
              element={<Cart cart={cart}  updateQuantity={updateQuantity}/>} />
            <Route path="/:category" element={<Produts />} />
            <Route 
              path="/:category/:id" 
              element={<Detail addToCart={addToCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
