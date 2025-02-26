import { createSlice } from "@reduxjs/toolkit";

import { loginThunk, registerThunk, logoutThunk } from "./authThunks";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.data.token;
        localStorage.setItem("token", payload.data.token);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        localStorage.removeItem("token");
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
