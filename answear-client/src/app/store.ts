import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "services/category.ts";
import { discountApi } from "services/discount.ts";
import { filterApi } from "services/filter.ts";
import { targetGroupApi } from "services/targetGroup.ts";

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [targetGroupApi.reducerPath]: targetGroupApi.reducer,
        [discountApi.reducerPath]: discountApi.reducer,
        [filterApi.reducerPath]: filterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoryApi.middleware,
            targetGroupApi.middleware,
            discountApi.middleware,
            filterApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
