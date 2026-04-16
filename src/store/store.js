import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from "./cartSlice"
import wishlistSliceReducer from "./wishlistSlice"
import authSliceReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    wishlist: wishlistSliceReducer,
    auth: authSliceReducer,
  },
});
