import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import {store} from './redux/store'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <BrowserRouter  basename="/react-pizza">
    <App />
  </BrowserRouter>
  </Provider>
);
