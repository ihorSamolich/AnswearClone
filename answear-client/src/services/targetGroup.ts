import { createApi } from "@reduxjs/toolkit/query/react";
import { ITargetGroup } from "interfaces/category";
import { createBaseQuery } from "utils/baseQuery.ts";

export const targetGroupApi = createApi({
  reducerPath: "targetGroupApi",
  baseQuery: createBaseQuery("targetGroup"),
  tagTypes: ["TargetGroups"],

  endpoints: (builder) => ({
    getTargetGroups: builder.query<ITargetGroup[], void>({
      query: () => "getAll",
      providesTags: ["TargetGroups"],
    }),
  }),
});

export const { useGetTargetGroupsQuery } = targetGroupApi;
