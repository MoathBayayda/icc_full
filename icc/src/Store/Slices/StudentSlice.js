import { createSlice } from "@reduxjs/toolkit";
const StudentSlice = createSlice({
  name: "Student",
  initialState: { certificates: [] },
  reducers: {
    fetchStudent(state, action) {
      return { ...action.payload };
    },
    dropRegCourse(state, action) {
      console.log(action.payload);
      const newRegCourseIds = state.reg_course_ids.filter(
        (regCourseId) => regCourseId !== action.payload
      );
      const newStudentObject = { ...state };
      newStudentObject.reg_course_ids = [...newRegCourseIds];
      return { ...newStudentObject };
    },
    regCourse(state, action) {
      const newStudentObject = { ...state };
      newStudentObject.reg_course_ids = [...action.payload];
      return { ...newStudentObject };
    },
  },
});
export { StudentSlice };
export const { fetchStudent, dropRegCourse, regCourse } = StudentSlice.actions;
