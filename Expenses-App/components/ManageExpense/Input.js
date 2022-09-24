import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const { label, inputBorder } = Colors.inputContainer;

const Input = ({ label, textInputConfig, style, isInvalid }) => {
	return (
		<View style={styles.inputContainer}>
			<View style={styles.innerContainer}>
				<Text style={styles.inputLabel}>{label}</Text>
				<TextInput
					selectionColor="#8A8686"
					{...textInputConfig}
					style={[styles.inputField, style, isInvalid && styles.errorField]}
				/>
			</View>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: "center",
	},
	innerContainer: {},
	inputLabel: {
		fontSize: 16,
		fontWeight: "bold",
		color: label,
	},
	inputField: {
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: inputBorder,
		marginBottom: 8,
		fontSize: 20,
	},
	errorField: {
		borderBottomWidth: 2,
		borderRightWidth: 2,
		borderWidth: 2,
		borderColor: "#FF0000",
		backgroundColor: "#FF24244B",
	},
});
