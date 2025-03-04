import { createSlice } from "@reduxjs/toolkit";

import {
  createTransactionThunk,
  myTransactionThunk,
  allTransactionThunk,
  transactionByIdThunk,
  updateProofPaymentUrl,
  updateStatusThunk,
  cancelTransactionThunk,
} from "./transactionThunks";
import { all } from "axios";

const initialState = {
  allTransaction: [],
  myTransaction: [],
  error: null,
  loading: false,
  selectedItem: null,
  selectedLoading: false,
  allTransactionCurrentPage: 1,
  allTransactionTotalPages: 1,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.selectedLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allTransactionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(allTransactionThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allTransaction = payload.result.data;
        state.allTransactionCurrentPage = payload.result.current_page;
        state.allTransactionTotalPages = payload.result.last_page;
      })
      .addCase(allTransactionThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(myTransactionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(myTransactionThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      .addCase(myTransactionThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(transactionByIdThunk.pending, (state) => {
        state.selectedLoading = true;
      })
      .addCase(transactionByIdThunk.fulfilled, (state, { payload }) => {
        state.selectedLoading = false;
        state.selectedItem = payload.result;
      })
      .addCase(transactionByIdThunk.rejected, (state, { payload }) => {
        state.selectedLoading = false;
      })
      .addCase(updateStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelTransactionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelTransactionThunk.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSelectedItem } = transactionSlice.actions;
export default transactionSlice.reducer;
