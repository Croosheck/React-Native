import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { useContext } from "react";

const AllExpenses = () => {
	const { expenses: expensesData } = useContext(ExpensesContext);

	return (
		<ExpensesOutput
			expenses={expensesData}
			expensesPeriod="Total:"
			fallbackText={"No expenses on Your list yet."}
		/>
	);
};

export default AllExpenses;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
