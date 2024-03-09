import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import pizzasSlice from './slices/pizzasSlice'
import CartSlice from './slices/CartSlice'



export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizzas: pizzasSlice,
    cart: CartSlice
  }
})
