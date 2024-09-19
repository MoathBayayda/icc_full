import { createSlice } from "@reduxjs/toolkit";
const NewsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    fetchAllNews(state, action) {
      return action.payload;
    },
  },
});

export { NewsSlice };
export const { fetchAllNews } = NewsSlice.actions;