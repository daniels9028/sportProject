import { createAsyncThunk } from "@reduxjs/toolkit";

import activityServices from "../../api/activityServices";

export const sportActivitiesThunk = createAsyncThunk(
  "activity/sport-activities",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await activityServices.sportActivitiesRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sportActivityByIdThunk = createAsyncThunk(
  "activity/sport-activity-by-id",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await activityServices.sportActivityByIdRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createSportActivityThunk = createAsyncThunk(
  "activity/create-sport-activity",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await activityServices.createSportActivityRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateSportActivityThunk = createAsyncThunk(
  "activity/update-sport-activity",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await activityServices.updateSportActivityRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteSportActivityThunk = createAsyncThunk(
  "activity/delete-sport-activity",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await activityServices.deleteSportActivityRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
