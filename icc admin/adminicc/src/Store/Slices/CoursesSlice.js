import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [{}],
  reducers: {
    fetchCourses(state, action) {
      return [...action.payload];
    },
  },
});
export { coursesSlice };
export const { fetchCourses } = coursesSlice.actions;
