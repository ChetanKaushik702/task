import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import ProductDetails from "./components/ProductDetails";
import ShowCart from "./components/ShowCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home/:userId",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginSignup />,
  },
  {
    path: "/product/:id/:userId",
    element: <ProductDetails />,
  },
  {
    path: "/cart/:userId",
    element: <ShowCart />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
