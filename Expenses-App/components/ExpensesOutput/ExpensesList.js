import { FlatList, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
	return (
		<ExpenseItem
			id={itemData.item.id}
			description={itemData.item.description}
			date={
				itemData.item.date.getDate().toString().padStart(2, "0") +
				"-" +
				(itemData.item.date.getMonth() + 1).toString().padStart(2, "0") +
				"-" +
				itemData.item.date.getFullYear().toString()
			}
			amount={itemData.item.amount}
		/>
	);
};

const ExpensesList = ({ expenses }) => {
	return (
		<FlatList
			data={expenses}
			keyExtractor={(item) => item.id}
			renderItem={renderExpenseItem}
		/>
	);
};

export default ExpensesList;

const styles = StyleSheet.create({});
