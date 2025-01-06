import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (!existingItem) {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseItemQuantity: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseItemQuantity: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
