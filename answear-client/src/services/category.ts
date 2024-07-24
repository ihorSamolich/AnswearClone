import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory } from "interfaces/category";
import { createBaseQuery } from "utils/baseQuery.ts";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: createBaseQuery("category"),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => "getAll",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
