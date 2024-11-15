import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
