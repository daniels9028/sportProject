import { createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "../../api/profileServices";

export const updateUserThunk = createAsyncThunk(
  "profile/update-user",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await profileServices.updateUserRequest(credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const myProfileThunk = createAsyncThunk(
  "profile/get-my-profile",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await profileServices.myProfile();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
