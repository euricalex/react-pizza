import React from "react";

// import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Cart, Home, NotFoundBlock } from "./pages";


// import { setPizzaz } from "./redux/actions/pizzaz";
export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue]= React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header  />
      <div className="content">
        <Routes>
          <Route   path="/" element={<Home  />} />
          <Route  path="/cart" element={<Cart />} />
          <Route  path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
      </SearchContext.Provider>
    </div>
  );
}
export default App;
