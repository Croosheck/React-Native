import { configureStore } from "@reduxjs/toolkit";
import managingExpenses from "./managingExpenses";

const store = configureStore({
	reducer: { expensesReducer: managingExpenses },
});

export default store;
