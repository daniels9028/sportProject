import { createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "../../api/profileServices";

export const updateUserThunk = createAsyncThunk(
  "profile/update-user",
  async ({ userId, credential }, thunkAPI) => {
    try {
      const { data } = await profileServices.updateUserRequest(
        userId,
        credential
      );

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
