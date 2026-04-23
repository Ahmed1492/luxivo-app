import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});