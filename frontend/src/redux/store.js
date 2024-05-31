import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";
import favoriteReducer from "./features/favorites/favoriteSlice.js";
import shopReducer from "./features/shop/shopSlice.js";
import cartReducer from "./features/cart/cartSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    shop: shopReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
