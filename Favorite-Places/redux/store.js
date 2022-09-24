import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/slices";

export const store = configureStore({
	reducer: {
		userReducer: userSlice,
	},
});
