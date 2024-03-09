import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Cart, Home, NotFoundBlock } from "./pages";

export const SearchContext = React.createContext();

function App() {
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}
export default App;
