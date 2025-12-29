import { createSlice, createSelector } from '@reduxjs/toolkit';

// ============================================
// Exercise 1.2: Shopping Cart with Redux Toolkit
// Using createSlice for automatic action creators
// Using createSelector for memoized selectors
// ============================================

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item - handles both new items and quantity increment
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // Add new item with quantity 1
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      // Recalculate total
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    
    // Remove item - handles both decrement and full removal
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item entirely
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // Decrement quantity
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
        
        // Recalculate total
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
    
    // Delete item completely regardless of quantity
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Export actions
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

// Base selectors
const selectCart = (state) => state.cart;
const selectCartItems = (state) => state.cart.items;
const selectTotalAmount = (state) => state.cart.totalAmount;

// Memoized selector for cart count
export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

// ============================================
// Challenge: Memoized selector for 10% tax
// Only recalculates when totalAmount changes
// ============================================
export const selectCartTax = createSelector(
  [selectTotalAmount],
  (totalAmount) => {
    console.log('Calculating tax... (only runs when totalAmount changes)');
    return totalAmount * 0.10;
  }
);

// Memoized selector for grand total (amount + tax)
export const selectGrandTotal = createSelector(
  [selectTotalAmount, selectCartTax],
  (totalAmount, tax) => totalAmount + tax
);

// Export reducer
export default cartSlice.reducer;
