import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from 'redux-thunk';
import rootReducer from "./reducers";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: rootReducer,
  // composeEnhancer(applyMiddleware(thunk))
});

export default store;
