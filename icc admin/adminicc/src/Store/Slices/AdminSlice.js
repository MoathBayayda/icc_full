import { createSlice } from "@reduxjs/toolkit";
const AdminSlice = createSlice({
  name: "Admin",
  initialState: {},
  reducers: {
    fetchAdmin(state, action) {
      return { ...action.payload };
    },
  },
});
export { AdminSlice };
export const { fetchAdmin} = AdminSlice.actions;
