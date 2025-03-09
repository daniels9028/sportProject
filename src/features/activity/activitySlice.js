import { createSlice } from "@reduxjs/toolkit";

import {
  sportActivitiesThunk,
  sportActivityByIdThunk,
  createSportActivityThunk,
  updateSportActivityThunk,
  deleteSportActivityThunk,
} from "./activityThunks";

const initialState = {
  activity: [],
  currentPage: 1,
  totalPages: 1,
  error: null,
  loading: false,
  selectedItem: null,
  selectedLoading: false,
  selectedCategory: null,
  selectedCity: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.selectedLoading = false;
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
      .addCase(sportActivitiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sportActivitiesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.activity = payload.result.data;
        state.currentPage = payload.result.current_page;
        state.totalPages = payload.result.last_page;
      })
      .addCase(sportActivitiesThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(sportActivityByIdThunk.pending, (state) => {
        state.selectedLoading = true;
      })
      .addCase(sportActivityByIdThunk.fulfilled, (state, { payload }) => {
        state.selectedLoading = false;
        state.selectedItem = payload.result;
      })
      .addCase(sportActivityByIdThunk.rejected, (state, { payload }) => {
        state.selectedLoading = false;
        state.error = payload;
      })
      .addCase(createSportActivityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSportActivityThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createSportActivityThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteSportActivityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSportActivityThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteSportActivityThunk.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const { clearSelectedItem, setSelectedCategory, setSelectedCity } =
  activitySlice.actions;
export default activitySlice.reducer;
