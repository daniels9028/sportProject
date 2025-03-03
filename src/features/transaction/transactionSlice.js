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
  selectedTransaction: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(allTransactionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(allTransactionThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      .addCase(allTransactionThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default transactionSlice.reducer;
