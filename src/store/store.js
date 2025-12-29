import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// ============================================
// Exercise 1.2: Redux Toolkit Store Setup
// ============================================

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
