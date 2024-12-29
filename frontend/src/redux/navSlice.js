import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    nav: "/home",
  },
  reducers: {
    setNav: (state, action) => {
      state.nav = action.payload;
    },
  },
});

export const { setNav } = navSlice.actions;
