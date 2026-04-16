import { createSlice } from '@reduxjs/toolkit';

const loadWishlistState = () => {
  try {
    const serializedState = localStorage.getItem('wishlistState');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveWishlistState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('wishlistState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadWishlistState(),
  reducers: {
    addToWishlist(state, action) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
      saveWishlistState(state);
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistState(state);
    },
    clearWishlist(state) {
      state.items = [];
      saveWishlistState(state);
    },
  },
});

export default wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
