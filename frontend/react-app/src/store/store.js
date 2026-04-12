import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import deliveryReducer from './deliverySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    delivery: deliveryReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
