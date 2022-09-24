import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2021-12-19"),
	},
	{
		id: "e2",
		description: "A pair of trousers",
		amount: 85.99,
		date: new Date("2022-02-21"),
	},
	{
		id: "e3",
		description: "Some bananas",
		amount: 7.29,
		date: new Date("2021-10-01"),
	},
	{
		id: "e4",
		description: "A book",
		amount: 14,
		date: new Date("2022-02-19"),
	},
	{
		id: "e5",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-02-21"),
	},
	{
		id: "e6",
		description: "A pair of trousers",
		amount: 85.99,
		date: new Date("2022-02-25"),
	},
	{
		id: "e7",
		description: "Some bananas",
		amount: 7.29,
		date: new Date("2021-12-01"),
	},
	{
		id: "e8",
		description: "A book",
		amount: 14.99,
		date: new Date("2021-12-19"),
	},
	{
		id: "e9",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-02-21"),
	},
];

const managingExpenses = createSlice({
	name: "manageExpenses",
	initialState: { expensesList: DUMMY_EXPENSES },
	reducers: {
		removeExpense(state, action) {
			const item = action.payload;
			state.expensesList = state.expensesList.filter(
				(expense) => expense.id !== item
			);
		},
		addExpense(state, action) {
			// state.expensesList.push(action.payload[{ ...expense }]);
		},
		updateExpense(state, action) {},
	},
});

export const { addExpense, removeExpense, updateExpense } =
	managingExpenses.actions;

export default managingExpenses.reducer;
