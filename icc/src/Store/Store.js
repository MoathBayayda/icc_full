import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import configSlice from "./Slices/ConfigSlice";
import {
  changePath,
  changeIsLoggedIn,
  changeRenderedCourse,
  changeRenderedNew,
} from "./Slices/ConfigSlice";
import { NewsSlice, fetchAllNews } from "./Slices/NewsSlice";
import {
  NewsAPI,
  useGetAllNewsQuery,
  useGetSingleNewQuery,
} from "./APIS/NewsAPI";
import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
  usePutStudentMutation,
  usePostLogoutMutation,
} from "./APIS/AuthAPI";

import {
  StudentSlice,
  fetchStudent,
  dropRegCourse,
  regCourse,
} from "./Slices/StudentSlice";
import {
  CoursesAPI,
  useGetCoursesQuery,
  usePostCourseMutation,
  useDeleteCourseMutation,
  useGetStudentRegCoursesQuery,
} from "./APIS/CoursesAPI";

import {
  RegCoursesSlice,
  fetchRegCourses,
  addCourse,
  dropCourse,
} from "./Slices/RegCoursesSlice";
import { coursesSlice, fetchCourses } from "./Slices/CoursesSlice";
const store = configureStore({
  reducer: {
    news: NewsSlice.reducer,
    config: configSlice.reducer,
    student: StudentSlice.reducer,
    regCourses: RegCoursesSlice.reducer,
    courses: coursesSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [NewsAPI.reducerPath]: NewsAPI.reducer,
    [CoursesAPI.reducerPath]: CoursesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(NewsAPI.middleware)
      .concat(AuthAPI.middleware)
      .concat(CoursesAPI.middleware),
});
setupListeners(store.dispatch);
export {
  store,
  changePath,
  fetchAllNews,
  useGetAllNewsQuery,
  changeIsLoggedIn,
  usePostAuthMutation,
  usePostSignupMutation,
  usePostLoginMutation,
  fetchStudent,
  usePutStudentMutation,
  useGetCoursesQuery,
  fetchCourses,
  usePostCourseMutation,
  useDeleteCourseMutation,
  dropRegCourse,
  regCourse,
  changeRenderedCourse,
  changeRenderedNew,
  useGetSingleNewQuery,
  useGetStudentRegCoursesQuery,
  fetchRegCourses,
  usePostLogoutMutation,
  addCourse,
  dropCourse,
};
