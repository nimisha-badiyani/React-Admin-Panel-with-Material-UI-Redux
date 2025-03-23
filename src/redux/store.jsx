import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./custom_store"; // Adjust path as necessary
import authSlice from "./slices/authSlice"; // Adjust path as necessary
import projectSlice from "./slices/projectSlice"; // Adjust path as necessary
import estimations from "./slices/estimationSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectSlice,
  estimations: estimations,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
