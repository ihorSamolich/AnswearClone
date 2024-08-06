import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductCreate } from "interfaces/product";
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

        createProduct: builder.mutation<void, IProductCreate>({
            query: (product) => {
                const formData = new FormData();

                formData.append("name", product.name);
                formData.append("description", product.description);
                formData.append("categoryId", product.categoryId.toString());

                product.variations?.forEach((variation, index) => {
                    formData.append(`variations[${index}].shortDescription`, variation.shortDescription);
                    formData.append(`variations[${index}].price`, variation.price.toString());

                    if (variation.discountValueId !== undefined) {
                        formData.append(`variations[${index}].discountValueId`, variation.discountValueId.toString());
                    }

                    if (variation.filters?.length) {
                        formData.append(`variations[${index}].filters`, JSON.stringify(variation.filters));
                    }

                    if (variation.photos?.length) {
                        variation.photos.forEach((photo, photoIndex) => {
                            formData.append(`variations[${index}].photos[${photoIndex}]`, photo);
                        });
                    }
                });

                return {
                    url: "create",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Products"],
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

export const { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation, useGetProductByIdQuery } = productApi;
