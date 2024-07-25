import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreateDiscount, IDiscount } from "interfaces/discount";
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
    createDiscount: builder.mutation<void, ICreateDiscount>({
      query: (discount) => {
        const formData = new FormData();
        formData.append("Name", discount.name);
        discount.values.forEach((item) => formData.append("Values", item.value));
        formData.append("mediaFile", discount.mediaFile);
        return {
          url: "/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Discounts"],
    }),
  }),
});

export const { useGetDiscountsQuery, useCreateDiscountMutation } = discountApi;
