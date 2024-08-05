import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "interfaces/product";
import { createBaseQuery } from "utils/baseQuery.ts";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: createBaseQuery("product"),
    tagTypes: ["Products"],

    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => "getAll",
            providesTags: ["Products"],
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => `getById/${id}`,
            providesTags: (_result, _error, arg) => [{ type: "Products", id: arg }],
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const { useGetProductsQuery, useDeleteProductMutation, useGetProductByIdQuery } = productApi;
