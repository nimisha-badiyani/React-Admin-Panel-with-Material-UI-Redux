import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../thunks/authThunk";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  successMessage: null,
  loginTimestamp: null,
  tokenExpirationTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loginTimestamp = null;
      state.tokenExpirationTime = null;
    },
    setAuthData: (state, action) => {
      state.loginTimestamp = action.payload.loginTimestamp;
      state.tokenExpirationTime = action.payload.tokenExpirationTime;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;

        // Save loginTimestamp and tokenExpirationTime in localStorage
        const loginTimestamp = Date.now();
        const tokenExpirationTime = loginTimestamp + 1000*60*60;

        localStorage.setItem("loginTimestamp", loginTimestamp);
        localStorage.setItem("tokenExpirationTime", tokenExpirationTime);

        state.loginTimestamp = loginTimestamp;
        state.tokenExpirationTime = tokenExpirationTime;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loginTimestamp = null;
        state.tokenExpirationTime = null;
        localStorage.removeItem("loginTimestamp");
        localStorage.removeItem("tokenExpirationTime");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { clearErrors, resetState, setAuthData } = authSlice.actions;

export default authSlice.reducer;
