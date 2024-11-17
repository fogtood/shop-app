import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (!existingItem) {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseItemQuantity: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItemQuantity: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
