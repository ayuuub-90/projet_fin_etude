import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/localStorageCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], payment_infos: {}, shipping_address: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add item to cart list
    addToCart: (state, action) => {
      const { ...product } = action.payload;
      const existProduct = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existProduct) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === product._id ? product : item
        );
      } else {
        state.cartItems = [...state.cartItems, product];
      }
      return updateCart(state, product);
    },

    // remove item from cart list
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return updateCart(state);
    },

    // save shipping information to the cart list
    saveShippingAddress: (state, action) => {
      state.shipping_address = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // save payment info to the cart list
    savePaymentInfos: (state, action) => {
      state.payment_infos = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // set the cart list
    setCart: (action) => {
      return action.payload;
    },

    // clear the cart list information
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  setCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentInfos,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
