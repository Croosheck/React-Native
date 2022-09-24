import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const {
	itemBackground,
	border,
	itemShadow,
	text,
	amountBackground,
	amountText,
} = Colors.listItem;

const ExpenseItem = ({ id, description, date, amount }) => {
	const navigation = useNavigation();

	function expensePressHandler() {
		return navigation.navigate("ManageExpense", {
			edit: "Edit expense",
			expenseId: id,
		});
	}

	return (
		<Pressable
			style={({ pressed }) =>
				pressed ? [styles.pressed, styles.pressable] : styles.pressable
			}
			onPress={expensePressHandler}
		>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{description}
					</Text>
					<Text style={styles.textBase}>{date}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ExpenseItem;

const styles = StyleSheet.create({
	pressable: {
		marginHorizontal: 24,
	},
	pressed: {
		opacity: 0.75,
	},
	expenseItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 12,
		marginVertical: 8,
		backgroundColor: itemBackground,
		borderWidth: 0.5,
		borderColor: border,
		borderRadius: 8,
		// elevation: 3,
		shadowColor: itemShadow,
		//ios ⬇
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
	},
	textBase: {
		color: text,
		marginVertical: 1,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: "bold",
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: amountBackground,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 4,
		minWidth: 80,
	},
	amount: {
		color: amountText,
		fontWeight: "bold",
		textAlign: "center",
	},
});
