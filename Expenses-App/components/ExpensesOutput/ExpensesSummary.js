import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const { background, periodText, sumText } = Colors.summaryBar;

const ExpensesSummary = ({ expenses, periodName }) => {
	const expensesSum = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);
	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
		</View>
	);
};

export default ExpensesSummary;

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginBottom: 12,
		backgroundColor: background,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 6,
	},
	period: {
		fontSize: 14,
		fontWeight: "bold",
		color: periodText,
	},
	sum: {
		fontSize: 16,
		fontWeight: "bold",
		color: sumText,
	},
});
