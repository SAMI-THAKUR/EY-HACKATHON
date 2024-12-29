import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { usersSlice } from "./userSlice";
import { navSlice } from "./navSlice";

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: usersSlice.reducer,
    nav: navSlice.reducer,
  },
});

export default store;
