import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accesstoken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/user/updateprofile",
          method: "PUT",
          body,
        };
      },
    }),
    makePayment: builder.mutation({
      query(body) {
        return {
          url: "/sub/new",
          method: "POST",
          body,
        };
      },
    }),
    // checkSub
    checkSub: builder.mutation({
      query(body) {
        return {
          url: "/sub/checkSub",
          method: "POST",
          body,
        };
      },
    }),
    // updateSession: builder.query({
    //   query() {
    //     return {
    //       url: "/auth/session?update",
    //     };
    //   },
    // }),
  }),
});

export const {
  useUpdateProfileMutation,
  useMakePaymentMutation,
  useCheckSubMutation,
  //  useLazyUpdateSessionQuery
} = userApi;
