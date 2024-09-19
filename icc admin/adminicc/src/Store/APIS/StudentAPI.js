import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const StudentAPI = createApi({
  reducerPath: "StudentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      getAllStudents: builder.query({
        query: () => {
          return {
            url: "/students",
            method: "GET",
            credentials: "include",
          };
        },
      }),
      getRegStudentCourses: builder.mutation({
        query: (data) => {
          return {
            url: "/courses/students",
            method: "GET",
            credentials: "include",
            params: { course_id: data },
          };
        },
      }),
      deleteStudent: builder.mutation({
        query: (data) => {
          return {
            url: "/students",
            method: "DELETE",
            credentials: "include",
            body: { student_id: data },
          };
        },
      }),
      deleteStudentCourse: builder.mutation({
        query: (data) => {
          return {
            url: "/course",
            method: "DELETE",
            credentials: "include",
            body: { ...data },
          };
        },
      }),
      postNewStudent: builder.mutation({
        query: (data) => {
          return {
            url: "/signup",
            method: "POST",
            body: data,
          };
        },
      }),
      putStudent: builder.mutation({
        query: (data) => {
          return {
            url: "/admin/student",
            method: "PUT",
            body: { ...data },
            credentials: "include",
          };
        },
      }),
    };
  },
});

export { StudentAPI };
export const {
  useGetAllStudentsQuery,
  useGetRegStudentCoursesMutation,
  useDeleteStudentCourseMutation,
  useDeleteStudentMutation,
  usePostNewStudentMutation,
  usePutStudentMutation,
} = StudentAPI;
