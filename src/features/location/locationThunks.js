import { createAsyncThunk } from "@reduxjs/toolkit";

import locationServices from "../../api/locationServices";

export const provincesThunk = createAsyncThunk(
  "location/provinces",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await locationServices.provinciesRequest();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const citiesByProvinceIdThunk = createAsyncThunk(
  "location/cities-by-province-id",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await locationServices.citiesByProvinceIdRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const citiesThunk = createAsyncThunk(
  "location/cities",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await locationServices.citiesRequest();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
