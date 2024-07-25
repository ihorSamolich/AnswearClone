import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory, ICreateCategory } from "interfaces/category";
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

    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Categories", id: arg }],
    }),

    createCategory: builder.mutation<void, ICreateCategory>({
      query: (category) => ({
        url: "create",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation, useDeleteCategoryMutation } =
  categoryApi;
