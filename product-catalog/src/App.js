import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/add" element={<AddProduct />} />

        <Route path="/edit/:id" element={<EditProduct />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
