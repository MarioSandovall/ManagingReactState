import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

import { CartProvider } from './cartContext'

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById("root")
);
