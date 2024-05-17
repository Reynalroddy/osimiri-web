import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  endpoints: (builder) => ({
    updateSession: builder.query({
      query() {
        return {
          url: "/auth/session?update",
        };
      },
    }),
  }),
});

export const { useLazyUpdateSessionQuery } = sessionApi;
