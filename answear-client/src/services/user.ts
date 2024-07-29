import { createApi } from "@reduxjs/toolkit/query/react";
import { ILogin, ISignInResponse, IUser } from "interfaces/user";
import { createBaseQuery } from "utils/baseQuery.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("user"),
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        signIn: builder.mutation<ISignInResponse, ILogin>({
            query: (credentials) => ({
                url: "SignIn",
                method: "POST",
                body: credentials,
            }),
        }),
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

export const { useGetUsersQuery, useLockUserMutation, useSignInMutation } = userApi;
