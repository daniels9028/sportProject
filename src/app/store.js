import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import categoryReducer from "../features/category/categorySlice";
import activityReducer from "../features/activity/activitySlice";
import locationReducer from "../features/location/locationSlice";
import paymentReducer from "../features/payment/paymentSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    activity: activityReducer,
    location: locationReducer,
    payment: paymentReducer,
    transaction: transactionReducer,
  },
});
