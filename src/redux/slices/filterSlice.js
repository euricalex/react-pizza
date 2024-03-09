import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  value: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  },
});

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setValue, setFilters} =
  filterSlice.actions;

export default filterSlice.reducer;
