import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Colors from "../../constants/colors";
import Button from "../UI/Button";

const { containerBackground, containerBorder, inputBackground } =
	Colors.inputContainer;

const ExpenseForm = ({
	autoFocus,
	onSubmit,
	onCancel,
	submitButtonLabel,
	defaultValues,
}) => {
	const [placeholder, setPlaceholder] = useState({
		amountPlaceholder: "",
		descriptionPlaceholder: "",
	});

	const [inputValues, setInputValues] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues
				? defaultValues.date.toISOString().slice(0, 10)
				: new Date().toISOString().slice(0, 10),
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : "",
			isValid: true,
		},
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues((currentValues) => {
			return {
				...currentValues,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputValues.amount.value,
			date: new Date(inputValues.date.value),
			description: inputValues.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descriptionIsValid = expenseData.description?.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			if (!amountIsValid || !descriptionIsValid) {
				setPlaceholder({
					amountPlaceholder: "Can't be empty!",
					descriptionPlaceholder: "Can't be empty!",
				});
			}

			setInputValues((current) => {
				return {
					amount: { ...current.amount, isValid: amountIsValid },
					date: { ...current.date, isValid: dateIsValid },
					description: { ...current.description, isValid: descriptionIsValid },
				};
			});
			return;
		}
		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputValues.amount.isValid ||
		!inputValues.date.isValid ||
		!inputValues.description.isValid;

	return (
		<>
			<View style={styles.rootContainer}>
				<View style={styles.inputContainer}>
					<ScrollView>
						<View style={styles.amountDateContainer}>
							<Input
								label={"Amount"}
								isInvalid={!inputValues.amount.isValid}
								textInputConfig={{
									keyboardType: "decimal-pad",
									autoFocus: autoFocus,
									onChangeText: inputChangedHandler.bind(this, "amount"),
									value: inputValues.amount.value,
									placeholder: inputValues.amount.isValid
										? "0.00"
										: placeholder.amountPlaceholder,
									onFocus: () =>
										setPlaceholder((current) => {
											return { ...current, amountPlaceholder: "" };
										}),
								}}
								style={[styles.inputField]}
							/>
							<Input
								label={"Date"}
								isInvalid={!inputValues.date.isValid}
								textInputConfig={{
									keyboardType: "decimal-pad",
									placeholder: "YYYY-MM-DD",
									maxLength: 10,
									onChangeText: inputChangedHandler.bind(this, "date"),
									value: inputValues.date.value,
								}}
								style={[styles.inputField]}
							/>
						</View>
						<Input
							label={"Description"}
							isInvalid={!inputValues.description.isValid}
							textInputConfig={{
								multiline: true,
								onChangeText: inputChangedHandler.bind(this, "description"),
								value: inputValues.description.value,
								placeholder: inputValues.description.isValid
									? ""
									: placeholder.descriptionPlaceholder,
							}}
							style={[styles.inputField, styles.inputMultiline]}
						/>
					</ScrollView>
				</View>
			</View>
			{formIsInvalid && (
				<Text style={styles.errorMessage}>
					Invalid input values - please check Your entered data!
				</Text>
			)}
			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginBottom: 20,
		minHeight: 230,
		maxHeight: "100%",
	},
	inputContainer: {
		backgroundColor: containerBackground,
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: containerBorder,
		paddingVertical: 16,
	},
	amountDateContainer: {
		flexDirection: "row",
	},
	inputField: {
		backgroundColor: inputBackground,
		paddingHorizontal: 4,
		paddingVertical: 2,
		borderRadius: 4,
	},
	inputMultiline: {
		minHeight: 100,
		maxHeight: 200,
		textAlignVertical: "top",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		height: 55,
		minHeight: 50,
	},
	button: {
		width: "40%",
	},
	errorMessage: {
		textAlign: "center",
		marginBottom: 8,
		fontSize: 15,
		fontWeight: "bold",
	},
});
