import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import categoryReducer from "../features/category/categorySlice";
import activityReducer from "../features/activity/activitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    activity: activityReducer,
  },
});
