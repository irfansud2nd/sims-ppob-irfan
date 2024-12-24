import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import balanceReducer from "./balanceSlice";
import serviceReducer from "./serviceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    balance: balanceReducer,
    service: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
