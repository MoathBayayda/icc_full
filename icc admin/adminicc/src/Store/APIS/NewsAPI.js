/**
 * Module representing the NewsAPI.
 * @module NewsAPI
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/**
 * The NewsAPI object.
 * @type {object}
 * @property {string} reducerPath - The reducer path for the NewsAPI.
 * @property {function} baseQuery - The base query function for the NewsAPI.
 * @property {object} endpoints - The endpoints available in the NewsAPI.
 */
const NewsAPI = createApi({
  reducerPath: "NewsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      /**
       * The GET_ALL_NEWS endpoint.
       * @type {object}
       * @property {function} query - The query function for the GET_ALL_NEWS endpoint.
       * @returns {object} - The URL and method for the GET_ALL_NEWS endpoint.
       */
      getAllNews: builder.query({
        query: (data) => {
          return {
            url: "/news",
            method: "GET",
            params: { minId: data.minId, maxId: data.maxId },
          };
        },
      }),
      getSingleNew: builder.query({
        query: (data) => {
          return {
            url: "/news/id",
            method: "GET",
            params: { id: data },
          };
        },
      }),
      putSingleNew: builder.mutation({
        query: (data) => {
          return {
            url: "/news/id",
            method: "PUT",
            credentials: "include",
            body: { ...data },
          };
        },
      }),
      deleteSingleNew: builder.mutation({
        query: (data) => {
          return {
            url: "/news",
            method: "DELETE",
            credentials: "include",
            params: { id: data },
          };
        },
      }),
      postSingleNew: builder.mutation({
        query: (data) => {
          return {
            url: "/news",
            method: "POST",
            credentials: "include",
            body: { ...data },
          };
        },
      }),
    };
  },
});

export { NewsAPI };
export const {
  useGetAllNewsQuery,
  useGetSingleNewQuery,
  usePutSingleNewMutation,
  useDeleteSingleNewMutation,
  usePostSingleNewMutation,
} = NewsAPI;
