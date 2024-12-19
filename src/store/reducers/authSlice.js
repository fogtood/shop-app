import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    error: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.error = null; // Clear any previous error on successful login
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null; // Clear any previous error on logout
    },
    setError: (state, { payload }) => {
      state.error = payload; // Set the error message
      state.loading = false;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
