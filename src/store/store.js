import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'; // We'll create this next

export const store = configureStore({
  reducer: {
    data: dataReducer, // "data" will be the slice name
  },
});