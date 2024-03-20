import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import pizzasSlice from "./slices/pizzasSlice";
import CartSlice from "./slices/CartSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizzas: pizzasSlice,
    cart: CartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
