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
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
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
      });
  },
});

export default activitySlice.reducer;
