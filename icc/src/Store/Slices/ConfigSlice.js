import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    path: "/home",
    isLoggedIn: false,
    renderedCourseId: null,
    renderedNewId: null,
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
  },
});
export default configSlice;
export const {
  changePath,
  changeIsLoggedIn,
  changeRenderedCourse,
  changeRenderedNew,
} = configSlice.actions;
