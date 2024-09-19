import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    path: "/news",
    isLoggedIn: false,
    renderedCourseId: null,
    renderedNewId: null,
    renderedStudentId: null,
  },
  reducers: {
    changePath(state, action) {
      return { ...state, path: action.payload };
    },
    changeIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
    changeRenderedCourse(state, action) {
      return { ...state, renderedCourseId: action.payload };
    },
    changeRenderedNew(state, action) {
      return { ...state, renderedNewId: action.payload };
    },
    changeRenderedStudentId(state, action) {
      return { ...state, renderedStudentId: action.payload };
    },
  },
});
export default configSlice;
export const {
  changePath,
  changeIsLoggedIn,
  changeRenderedCourse,
  changeRenderedNew,
  changeRenderedStudentId
} = configSlice.actions;
