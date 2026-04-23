import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  user: userFromStorage,
  isLoggedIn: !!userFromStorage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
      // update in users list too
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const idx = users.findIndex((u) => u.email === state.user.email);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...action.payload };
        localStorage.setItem('users', JSON.stringify(users));
      }
    },
  },
});

export const { register, login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
