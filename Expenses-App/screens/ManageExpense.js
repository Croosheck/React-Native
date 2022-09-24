import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Colors from "../constants/colors";
import { ExpensesContext } from "../store/context/expenses-context";
import {
	storeExpense,
	updateExpense as updateFetch,
	deleteExpense as deleteFetch,
} from "../util/http";

const { screenBackground, trashButton, borderTop } = Colors.manageExpense;

const ManageExpense = ({ route, navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();

	const { addExpense, deleteExpense, updateExpense, expenses } =
		useContext(ExpensesContext);

	const id = route.params?.expenseId;
	const isEditing = !!id;

	const selectedExpense = expenses.find((expense) => expense.id === id);

	function cancelHandler() {
		navigation.goBack();
	}

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			await deleteFetch(id);
			deleteExpense(id);
			navigation.goBack();
		} catch (error) {
			setError("Could not delete expense - please try again later");
			setIsSubmitting(false);
		}
	}

	async function confirmHandler(expenseData) {
		setIsSubmitting(true);
		try {
			if (!isEditing) {
				const fetchId = await storeExpense(expenseData); //Firebase http request
				addExpense({ ...expenseData, id: fetchId });
				setIsSubmitting(false);
			} else {
				updateExpense(id, expenseData);
				await updateFetch(id, expenseData);
				setIsSubmitting(false);
			}
			navigation.goBack();
		} catch (error) {
			setError("Could not save data - please try again later!");
			setIsSubmitting(false);
		}
	}

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} />;
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.rootContainer}>
			<ExpenseForm
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
				defaultValues={selectedExpense}
				autoFocus={isEditing ? false : true}
			/>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						name={"trash"}
						color={trashButton}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpense;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		paddingBottom: 40,
		backgroundColor: screenBackground,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 18,
		borderTopWidth: 2,
		borderTopColor: borderTop,
		alignItems: "center",
	},
});
