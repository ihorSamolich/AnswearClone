import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreateFilter, IFilter, IUpdateFilter } from "interfaces/filter";
import { createBaseQuery } from "utils/baseQuery";

export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: createBaseQuery("filter"),
  tagTypes: ["Filters"],

  endpoints: (builder) => ({
    getFilters: builder.query<IFilter[], void>({
      query: () => "getAll",
      providesTags: ["Filters"],
    }),

    getFilterById: builder.query<IFilter, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Filters", id: arg }],
    }),

    createFilter: builder.mutation<void, ICreateFilter>({
      query: (filter) => ({
        url: "create",
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["Filters"],
    }),

    updateFilter: builder.mutation<void, IUpdateFilter>({
      query: (filter) => ({
        url: "update",
        method: "PUT",
        body: filter,
      }),
      invalidatesTags: ["Filters"],
    }),

    deleteFilter: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Filters"],
    }),
  }),
});

export const {
  useGetFiltersQuery,
  useGetFilterByIdQuery,
  useCreateFilterMutation,
  useUpdateFilterMutation,
  useDeleteFilterMutation,
} = filterApi;
