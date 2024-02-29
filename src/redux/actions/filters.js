import { type } from "@testing-library/user-event/dist/type";

export const setSortBy = (name) => ({
    type: 'SET_SORT_BY',
    payload: type
});

export const setCategory = (catIndex) => ({
type: 'SET_CATEGORY',
payload: catIndex
})