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
  selectedCategory: null,
  selectedCity: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedProvince: (state, { payload }) => {
      state.selectedProvince = payload;
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSelectedCity: (state, { payload }) => {
      state.selectedCity = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(provincesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(provincesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.provinces = payload.result.slice().map((item) => ({
          value: item.province_id,
          label: item.province_name_id,
        }));
      })
      .addCase(provincesThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(citiesByProvinceIdThunk.pending, (state) => {
        state.loading = true;
        state.selectedCity = null;
        state.cities = [];
      })
      .addCase(citiesByProvinceIdThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload.result.slice().map((item) => ({
          value: item.city_id,
          label: item.city_name_full,
        }));
      })
      .addCase(citiesByProvinceIdThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(citiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(citiesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload.result.slice().map((item) => ({
          value: item.city_id,
          label: item.city_name_full,
        }));
      })
      .addCase(citiesThunk.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setSelectedProvince, setSelectedCategory, setSelectedCity } =
  locationSlice.actions;
export default locationSlice.reducer;
