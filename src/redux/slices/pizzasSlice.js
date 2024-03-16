import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: 'loading'
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, categoryId, sort, currentPage } = params;
    const res = await axios.get(
      `https://65de3e3adccfcd562f56a3ca.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}&` : ""
      }&sortby=${sort.sortProperty}&order=asc${search}`
    );
    return res.data;
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
     state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
      });
  },
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
