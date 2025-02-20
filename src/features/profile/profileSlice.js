import { createSlice } from "@reduxjs/toolkit";

import { updateUserThunk, myProfileThunk } from "./profileThunks";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.user = payload.result;
      })
      .addCase(updateUserThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(myProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(myProfileThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
        sessionStorage.setItem("user", JSON.stringify(payload.data));
      })
      .addCase(myProfileThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default profileSlice.reducer;
