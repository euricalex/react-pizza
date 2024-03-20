import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export enum  SortPropertyEnum {
  RATING_DESC = 'rating',
  NAME_DESC = 'title',
  PRICE_ASC = 'price'
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}
export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  value: string;
sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  value: "",
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  },
});
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const searchValueSelector = (state: RootState) => state.filter.searchValue;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setValue, setFilters} =
  filterSlice.actions;

export default filterSlice.reducer;
