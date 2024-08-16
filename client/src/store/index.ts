import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalSlice from "./Global/globalSlice";
import { userApi } from "./Api/UserApi.ts";
import { productApi } from "./Api/ProductsApi.ts";
import { salesApi } from "./Api/SalesApi.ts";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(
      userApi.middleware,
      productApi.middleware,
      salesApi.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
