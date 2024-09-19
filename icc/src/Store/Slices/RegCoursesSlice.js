import { createSlice } from "@reduxjs/toolkit";

const RegCoursesSlice = createSlice({
  name: "regCourses",
  initialState: [{}],
  reducers: {
    fetchRegCourses(state, action) {
      return [...action.payload];
    },
    dropCourse(state,action){
      return [...state,...action.payload]
    },
    addCourse(state,action){
      const newRegCourses = state.filter((course)=>course.course_id !== action.payload)
      return [...newRegCourses]
    }
  },
});
export { RegCoursesSlice };
export const { fetchRegCourses,addCourse,dropCourse } = RegCoursesSlice.actions;
