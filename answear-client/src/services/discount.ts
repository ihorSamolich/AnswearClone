import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreateDiscount, IDiscount, IUpdateDiscount } from "interfaces/discount";
import { createBaseQuery } from "utils/baseQuery";

export const discountApi = createApi({
    reducerPath: "discountApi",
    baseQuery: createBaseQuery("discount"),
    tagTypes: ["Discounts"],

    endpoints: (builder) => ({
        getDiscounts: builder.query<IDiscount[], void>({
            query: () => "getAll",
            providesTags: ["Discounts"],
        }),
        getDiscountById: builder.query<IDiscount, number>({
            query: (id) => `getById/${id}`,
            providesTags: (_result, _error, arg) => [{ type: "Discounts", id: arg }],
        }),
        createDiscount: builder.mutation<void, ICreateDiscount>({
            query: (discount) => {
                const formData = new FormData();
                formData.append("Name", discount.name);

                discount.values.forEach((item) => formData.append("Values", item));

                formData.append("mediaFile", discount.mediaFile);
                return {
                    url: "/create",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Discounts"],
        }),
        updateDiscount: builder.mutation<void, IUpdateDiscount>({
            query: (discount) => {
                const formData = new FormData();
                formData.append("id", discount.id);
                formData.append("name", discount.name);

                discount.values.forEach((item) => formData.append("Values", item));

                if (discount.mediaFile) {
                    formData.append("mediaFile", discount.mediaFile);
                }

                return {
                    url: "update",
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Discounts"],
        }),
        deleteDiscount: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Discounts"],
        }),
    }),
});

export const {
    useGetDiscountsQuery,
    useCreateDiscountMutation,
    useGetDiscountByIdQuery,
    useUpdateDiscountMutation,
    useDeleteDiscountMutation,
} = discountApi;
