import { createSlice } from "@reduxjs/toolkit";

import {
  provincesThunk,
  citiesByProvinceIdThunk,
  citiesThunk,
} from "./locationThunks";

const initialState = {
  provinces: [],
  cities: [],
  selectedProvince: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(provincesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(provincesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.provinces = payload.result;
      })
      .addCase(provincesThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(citiesByProvinceIdThunk.pending, (state) => {
        state.loading = true;
        state.cities = [];
      })
      .addCase(citiesByProvinceIdThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload.result;
      })
      .addCase(citiesByProvinceIdThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setSelectedProvince } = locationSlice.actions;
export default locationSlice.reducer;
