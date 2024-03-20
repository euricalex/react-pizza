import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFomLS } from "../../utils/getCartFromLocaleStorage";
import { calcTotalPrice } from "../../utils/CalcTotalPrice";


export type  CartItem = {
  id: string,
  name: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number

}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const {items, totalPrice} =  getCartFomLS()
const initialState: CartSliceState = {
  totalPrice,
  items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
 
    addItem(state, action: PayloadAction<CartItem>) {
   const findItem = state.items.find(item => item.id === action.payload.id);
   if(findItem) {
    findItem.count++
   } else {
    state.items.push({
      ...action.payload,
      count: 1
    });
   }
  

   state.totalPrice = state.items.reduce((sum, item) => (item.price * item.count) + sum, 0);

    },


    minusItem(state, action: PayloadAction<string>) {
      const findItem= state.items.find(item => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
        state.totalPrice = calcTotalPrice(state.items);
      }
    
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => (item.price * item.count) + sum, 0);
    },

 

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelectorById = (id:string) => (state: RootState) => state.cart.items.find(item => item.id === id)
export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
