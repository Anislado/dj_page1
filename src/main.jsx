import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import Catalogo from "./Catalogo";
import Carrito from "./Carrito";
import Blog from "./Blog";
import Admin from "./pages/Admin.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/carrito"
          element={<Carrito />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route path="/admin" 
        element={<Admin />} />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>

);

