import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import Colors from "../../constants/colors";

const { background } = Colors.appContainer;

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
	let content = <Text style={styles.infoText}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = (
			<>
				<Text style={styles.editInfo}>
					Tap on any expense to edit or delete it!
				</Text>
				<ExpensesList expenses={expenses} />
			</>
		);
	}

	return (
		<View style={styles.rootContainer}>
			<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />

			{content}
		</View>
	);
};

export default ExpensesOutput;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		// padding: 24,
		paddingBottom: 0,
		backgroundColor: background,
	},
	editInfo: {
		textAlign: "center",
		color: "#ffffff",
		marginBottom: 8,
	},
	infoText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		marginTop: 32,
	},
});
