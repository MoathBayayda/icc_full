import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      postLogin: builder.mutation({
        query: (data) => {
          return {
            url: "/loginAdmin",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
      }),
      postAuth: builder.mutation({
        query: (data) => {
          return {
            url: "/authAdmin",
            method: "POST",
            credentials: "include",
          };
        },
      }),
      postLogout: builder.mutation({
        query: () => {
          return {
            url: "/logout",
            method: "POST",
            credentials: "include",
          };
        },
      }),
      putAdmin: builder.mutation({
        query: (data) => {
          return {
            url: "/admin",
            method: "PUT",
            credentials: "include",
            body: { ...data },
          };
        },
      }),
    };
  },
});

export { AuthAPI };
export const {
  usePostLoginMutation,
  usePostAuthMutation,
  usePostLogoutMutation,
  usePutAdminMutation,
} = AuthAPI;
