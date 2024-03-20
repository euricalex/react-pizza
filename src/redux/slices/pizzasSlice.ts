import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";



// type FetchPizzasArgs = Record<string, string>;

type Pizza = {
  id: number;
  name: string;
  imageUrl: string;
  types: number[];
  category: number;
  sizes: number[];
  price: number;
  rating: number;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
interface PizzaSliceState {
  items: Pizza[],
  status: Status;
}
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};



export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, categoryId, sort, currentPage } = params;
    const categoryIdNumber = parseInt(categoryId);
   
    const {data} = await axios.get(
      `https://65de3e3adccfcd562f56a3ca.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryIdNumber > 0 ? `category=${categoryId}&` : ""
      }&sortby=${sort}&order=asc${search}`
    );
   
    return data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
     state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
      });
  },
});
export const selectPizzaData = (state: RootState) => state.pizzas;
export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
