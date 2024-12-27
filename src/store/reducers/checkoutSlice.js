import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingDetails: {
    displayName: "",
    email: "",
    address: "",
    mobile: "",
  },
  isInternationalShipping: false,
  paymentMethod: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingDetails(state, action) {
      state.shippingDetails = action.payload;
    },
    setInternationalShipping(state, action) {
      state.isInternationalShipping = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setPaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    resetCheckout(state) {
      state.shippingDetails = initialState.shippingDetails;
      state.isInternationalShipping = initialState.isInternationalShipping;
      state.paymentMethod = initialState.paymentMethod;
    },
  },
});

export const {
  setShippingDetails,
  setInternationalShipping,
  setPaymentMethod,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
