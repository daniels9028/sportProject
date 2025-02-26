import { createSlice } from "@reduxjs/toolkit";

import {
  categoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "./categoryThunks";

const initialState = {
  category: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  paginate: true,
  limit: 5,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setPaginate: (state, action) => {
      state.paginate = action.payload.paginate;
      state.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoriesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.category = state.paginate ? payload.result.data : payload.result;
        state.currentPage = payload.result.current_page;
        state.totalPages = payload.result.last_page;
      })
      .addCase(categoriesThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createCategoryThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateCategoryThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteCategoryThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setPaginate } = categorySlice.actions;
export default categorySlice.reducer;
