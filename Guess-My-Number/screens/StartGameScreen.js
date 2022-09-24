import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState("");

	function numberInputHandler(enteredText) {
		setEnteredNumber(enteredText);
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber);
		if (
			!(
				chosenNumber <= 99 &&
				chosenNumber > 0 &&
				typeof Number(chosenNumber) === "number"
			)
		) {
			Alert.alert(
				"Invalid input!",
				"It has to be a number between 1 and 99. :-)",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: () => setEnteredNumber(null),
					},
				]
			);
			return;
		}
		console.log("Valid number!");
		onPickNumber(chosenNumber);
	}

	return (
		<View style={styles.startGameContainer}>
			<View style={styles.title}>
				<Title>Guess My Number</Title>
			</View>
			<View style={styles.inputContainer}>
				<Text
					style={{
						...styles.title,
						marginBottom: 0,
					}}
				>
					enter a number (1-99)
				</Text>
				<TextInput
					style={styles.numberInput}
					maxLength={2}
					keyboardType="number-pad"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={numberInputHandler}
					value={enteredNumber}
				/>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={() => setEnteredNumber(null)}>
							Reset
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
					</View>
				</View>
			</View>
		</View>
	);
}

export default StartGameScreen;

const styles = StyleSheet.create({
	startGameContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		// flex: 0.3,
		// marginBottom: 20,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: Colors.startScreen.title,
		fontStyle: "italic",
		fontVariant: ["small-caps"],
		marginBottom: 50,
	},
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 100,
		marginHorizontal: 24,
		padding: 16,
		paddingVertical: 40,
		backgroundColor: Colors.startScreen.background,
		borderRadius: 20,
		elevation: 4,
		//
		// iOS...
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
	numberInput: {
		height: 50,
		width: 70,
		fontSize: 32,
		borderBottomColor: Colors.startScreen.borderBottom,
		borderBottomWidth: 1,
		color: Colors.startScreen.number,
		marginVertical: 8,
		fontWeight: "bold",
		textAlign: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
