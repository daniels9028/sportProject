import { createSlice } from "@reduxjs/toolkit";

import { paymentMethodsThunk } from "./paymentThunks";

const initialState = {
  payment: [],
  error: null,
  loading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentMethodsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(paymentMethodsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.payment = payload.result;
      })
      .addCase(paymentMethodsThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
