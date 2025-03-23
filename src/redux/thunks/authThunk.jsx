// thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users",
        userData
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users?email=${userData.email}&password=${userData.password}`
      );

      if (response.data.length > 0) {
        return response.data[0];
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("x-access-token");
      return "Logout Successfully";
    } catch (error) {
      return rejectWithValue("Something Error Occured");
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        return { token };
      } else {
        return rejectWithValue("No token found, user is not authenticated.");
      }
    } catch (error) {
      return rejectWithValue("Error checking authentication status.");
    }
  }
);
