import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "interfaces/user";
import { createBaseQuery } from "utils/baseQuery.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("user"),
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => "getAll",
            providesTags: ["Users"],
        }),
        lockUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `BlockUser/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useGetUsersQuery, useLockUserMutation } = userApi;
