import { createSlice } from "@reduxjs/toolkit";

import { paymentMethodsThunk } from "./paymentThunks";

const initialState = {
  payment: [],
  selectedPayment: {},
  error: null,
  loading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedPayment: (state, { payload }) => {
      state.selectedPayment = payload;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },
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

export const { setSelectedPayment, clearSelectedPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
