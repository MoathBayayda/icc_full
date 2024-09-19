import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import configSlice from "./Slices/ConfigSlice";
import {
  changePath,
  changeIsLoggedIn,
  changeRenderedCourse,
  changeRenderedNew,
  changeRenderedStudentId,
} from "./Slices/ConfigSlice";
import { NewsSlice, fetchAllNews } from "./Slices/NewsSlice";
import {
  NewsAPI,
  useGetAllNewsQuery,
  useGetSingleNewQuery,
  usePutSingleNewMutation,
  useDeleteSingleNewMutation,
  usePostSingleNewMutation,
} from "./APIS/NewsAPI";
import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
  usePutAdminMutation
} from "./APIS/AuthAPI";

import { AdminSlice, fetchAdmin } from "./Slices/AdminSlice";
import {
  CoursesAPI,
  useGetCoursesQuery,
  usePostCourseMutation,
  useDeleteCourseMutation,
  useGetStudentRegCoursesQuery,
  usePutCoursesMutation,
  usePostStudentCourseMutation,
  useDeleteDropStudentCourseMutation,
} from "./APIS/CoursesAPI";

import {
  StudentAPI,
  useGetAllStudentsQuery,
  useGetRegStudentCoursesMutation,
  useDeleteStudentCourseMutation,
  useDeleteStudentMutation,
  usePostNewStudentMutation,
  usePutStudentMutation,
} from "./APIS/StudentAPI";
import { coursesSlice, fetchCourses } from "./Slices/CoursesSlice";

import {
  CourseStudentsSlice,
  fetchCoursesStudents,
} from "./Slices/CourseStudentsSlice";

import { StudentsSlice, fetchStudents } from "./Slices/StudentsSlice";
const store = configureStore({
  reducer: {
    news: NewsSlice.reducer,
    config: configSlice.reducer,
    admin: AdminSlice.reducer,
    courses: coursesSlice.reducer,
    students: StudentsSlice.reducer,
    courseStudents: CourseStudentsSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [NewsAPI.reducerPath]: NewsAPI.reducer,
    [CoursesAPI.reducerPath]: CoursesAPI.reducer,
    [StudentAPI.reducerPath]: StudentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(NewsAPI.middleware)
      .concat(AuthAPI.middleware)
      .concat(CoursesAPI.middleware)
      .concat(StudentAPI.middleware),
});
setupListeners(store.dispatch);
export {
  store,
  changePath,
  fetchAllNews,
  useGetAllNewsQuery,
  changeIsLoggedIn,
  usePostAuthMutation,
  usePostLoginMutation,
  fetchAdmin,
  usePutStudentMutation,
  useGetCoursesQuery,
  fetchCourses,
  usePostCourseMutation,
  useDeleteCourseMutation,
  changeRenderedCourse,
  changeRenderedNew,
  useGetSingleNewQuery,
  useGetStudentRegCoursesQuery,
  usePostLogoutMutation,
  usePutSingleNewMutation,
  useDeleteSingleNewMutation,
  usePostSingleNewMutation,
  usePutCoursesMutation,
  useGetAllStudentsQuery,
  useGetRegStudentCoursesMutation,
  fetchCoursesStudents,
  fetchStudents,
  useDeleteStudentCourseMutation,
  useDeleteStudentMutation,
  usePostStudentCourseMutation,
  useDeleteDropStudentCourseMutation,
  changeRenderedStudentId,
  usePostNewStudentMutation,
  usePutAdminMutation
};
