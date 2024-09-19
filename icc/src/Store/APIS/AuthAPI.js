import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      postLogin: builder.mutation({
        query: (data) => {
          return {
            url: "/login",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
      }),
      postAuth: builder.mutation({
        query: (data) => {
          return {
            url: "/auth",
            method: "POST",
            credentials: "include",
          };
        },
      }),
      putStudent: builder.mutation({
        query: (data) => {
          return {
            url: "/student",
            method: "PUT",
            credentials: "include",
            body: data,
          };
        },
      }),
      postSignup: builder.mutation({
        query: (data) => {
          return {
            url: "/signup",
            method: "POST",
            body: data,
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
    };
  },
});

export { AuthAPI };
export const {
  usePostLoginMutation,
  usePostAuthMutation,
  usePostSignupMutation,
  usePutStudentMutation,
  usePostLogoutMutation,
} = AuthAPI;
