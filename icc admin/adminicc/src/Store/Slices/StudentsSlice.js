import { createSlice } from "@reduxjs/toolkit";

const StudentsSlice = createSlice({
  name: "StudentsSlice",
  initialState: [{}],
  reducers: {
    fetchStudents(state, action) {
      if (action.payload !== undefined) return [...action.payload];
      else return [{}];
    },
  },
});
export { StudentsSlice };
export const { fetchStudents } = StudentsSlice.actions;
