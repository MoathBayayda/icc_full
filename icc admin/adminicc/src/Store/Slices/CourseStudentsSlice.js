import { createSlice } from "@reduxjs/toolkit";

const CourseStudentsSlice = createSlice({
  name: "CourseStudents",
  initialState: [{}],
  reducers: {
    fetchCoursesStudents(state, action) {
      return [...action.payload];
    },
  },
});
export { CourseStudentsSlice };
export const { fetchCoursesStudents } = CourseStudentsSlice.actions;
