import { createSlice } from '@reduxjs/toolkit';

const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];

const initialState = {
  orders: ordersFromStorage,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // newest first
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
