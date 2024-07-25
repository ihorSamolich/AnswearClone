import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "services/category.ts";
import { targetGroupApi } from "services/targetGroup.ts";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [targetGroupApi.reducerPath]: targetGroupApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware, targetGroupApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
