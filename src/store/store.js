import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'; // We'll create this next
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import notificationReducer from './slices/notificationSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer, // "data" will be the slice name
    auth: authReducer,
    booking: bookingReducer,
    notification: notificationReducer,
    subscription: subscriptionReducer,
  },
});