import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();
	const { expenses: expensesData, setExpenses } = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchExpenses();
				setExpenses(expenses);
			} catch (error) {
				setError("Could not fetch expenses!");
			}
			setIsFetching(false);
		}

		getExpenses();
	}, []);

	async function errorHandler() {
		setIsFetching(true);
		setError(null);
		const expenses = await fetchExpenses();
		setExpenses(expenses);
		setIsFetching(false);
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	function getDateMinusDays(date, days) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
	}

	const recentExpenses = expensesData.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 Days"
			fallbackText={"Add a new expense to see it on this list!"}
		/>
	);
};

export default RecentExpenses;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
