import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [{}],
  reducers: {
    fetchCourses(state, action) {
      return [...action.payload];
    },
    // getCourseById(state, action) {
    //   const [course] = state.filter(
    //     (courseObj) => courseObj.course_id === action.payload
    //   );
    // },
  },
});
export { coursesSlice };
export const { fetchCourses } = coursesSlice.actions;
