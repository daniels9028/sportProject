import { createSlice } from "@reduxjs/toolkit";

import { updateUserThunk, myProfileThunk } from "./profileThunks";
import { logoutThunk } from "../auth/authThunks";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
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
        localStorage.setItem("user", JSON.stringify(payload.data));
      })
      .addCase(myProfileThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logoutThunk.fulfilled, (state, { payload }) => {
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export default profileSlice.reducer;
