import { createSlice } from "@reduxjs/toolkit";
import {
  createEstimation,
  deleteEstimation,
  fetchEstimations,
  fetchEstimationsById,
  updateEstimation,
} from "../thunks/estimationThunk";

const initialState = { estimations: [], loading: false, error: null };
const estimationSlice = createSlice({
  name: "estimations",
  initialState,
  reducers: {
    clearErrors: (state) => {},
    resetState: (state) => {
      state.loading = false;
      state.estimations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Estimation List
      .addCase(fetchEstimations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEstimations.fulfilled, (state, action) => {
        state.loading = false;
        state.estimations = action.payload;
        state.error = null;
      })
      .addCase(fetchEstimations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Estimation Edit
      .addCase(updateEstimation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEstimation.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProject = action.payload;
        const index = state.estimations.findIndex(
          (estimations) => estimations.id === updatedProject.id
        );
        if (index !== -1) {
          state.estimations[index] = updatedProject;
        }
      })

      .addCase(updateEstimation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Estimation Create
      .addCase(createEstimation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEstimation.fulfilled, (state, action) => {
        state.loading = false;
        state.estimations.push(action.payload);
        state.error = null;
      })
      .addCase(createEstimation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Estimation By ID
      .addCase(fetchEstimationsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstimationsById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchEstimationsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Estimation
      .addCase(deleteEstimation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEstimation.fulfilled, (state, action) => {
        state.loading = false;
        state.estimations = state.estimations.filter(
          (estimation) => estimation.id !== action.payload.id
        );
      })
      .addCase(deleteEstimation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetState } = estimationSlice.actions;

export default estimationSlice.reducer;
