import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create estimation
export const createEstimation = createAsyncThunk(
  "estimations/createEstimation",
  async (newEstimation, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/estimation`,
        newEstimation
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// estimations List
export const fetchEstimations = createAsyncThunk(
  "estimations/fetchEstimations",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/estimation?userId=${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get By ID estimations
export const fetchEstimationsById = createAsyncThunk(
  "estimations/fetchEstimationsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/estimation/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update estimations
export const updateEstimation = createAsyncThunk(
  "estimations/updateEstimation",
  async ({ id, formData }, { rejectWithValue }) => {
    debugger;
    try {
      const response = await axios.put(
        `http://localhost:8080/estimation/${id}`,
        formData
      );
      debugger;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// estimations delete
export const deleteEstimation = createAsyncThunk(
  "estimations/deleteestimation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/estimation/${id}`
      );
      return response.data; // Return the fetched projects
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
