import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cartItems = [...state.cartItems, payload];
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
