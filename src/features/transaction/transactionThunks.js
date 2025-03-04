import { createAsyncThunk } from "@reduxjs/toolkit";

import transactionServices from "../../api/transactionServices";

export const createTransactionThunk = createAsyncThunk(
  "transaction/create-transaction",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.createTransactionRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const myTransactionThunk = createAsyncThunk(
  "transaction/my-transaction",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.myTransactionRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const allTransactionThunk = createAsyncThunk(
  "transaction/all-transaction",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.allTransactionsRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const transactionByIdThunk = createAsyncThunk(
  "transaction/transaction-by-id",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.transactionByIdRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProofPaymentUrl = createAsyncThunk(
  "transaction/update-proof-payment-url",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.updateProofPaymentUrlRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusThunk = createAsyncThunk(
  "transaction/update-status",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.updateStatusRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cancelTransactionThunk = createAsyncThunk(
  "transaction/cancel-transaction",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await transactionServices.cancelTransactionRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
