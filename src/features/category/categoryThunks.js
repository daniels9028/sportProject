import { createAsyncThunk } from "@reduxjs/toolkit";

import categoryServices from "../../api/categoryServices";

export const categoriesThunk = createAsyncThunk(
  "category/all-category",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await categoryServices.categoriesRequest(credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await categoryServices.createCategoryRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "category/update",
  async ({ id, name }, thunkAPI) => {
    try {
      const { data } = await categoryServices.updateCategoryRequest(id, name);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await categoryServices.deleteCategoryRequest(
        credentials
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
