import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Cart, Home, NotFoundBlock } from "./pages";
import FullPizza from "./pages/FullPizza";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
