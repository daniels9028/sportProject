import { createAsyncThunk } from "@reduxjs/toolkit";

import paymentServices from "../../api/paymentServices";

export const paymentMethodsThunk = createAsyncThunk(
  "payment-method/get-all-payment",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await paymentServices.paymentMethodsRequest(credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
