import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;
let replayButton;
let buttons = true;
let numOfGuesses = 1;

function GameScreen({ userNumber, onNewGame, onGameOver }) {
	const initialGuess = generateRandomBetween(
		minBoundary,
		maxBoundary,
		userNumber
	);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [scoreTable, setScoreTable] = useState([
		{ guess: currentGuess, key: Math.random().toString(), index: 0 },
	]);

	function nextGuessHandler(direction) {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Hey!", "It seems You do not play fair!", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		console.log(minBoundary, maxBoundary);
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);

		setScoreTable((current) => {
			return [
				{
					guess: newRndNumber,
					key: Math.random().toString(),
					// index: current.index + 1,
				},
				...current,
			];
		});

		if (newRndNumber === userNumber) {
			// Alert.alert("Got it! 🎉", `Looks like ${userNumber} is Your number!`, [
			// 	{ text: "Correct!" },
			// ]);

			onGameOver();
			replayButton = (
				<>
					<PrimaryButton onPress={restartGame}>
						Play Again!{" "}
						<MaterialIcons name="replay" size={24} color="#00F804" />
					</PrimaryButton>
					<Text style={styles.finalMessage}>
						Your phone needed{" "}
						<Text style={styles.highlightNums}>{numOfGuesses + 1}</Text> round
						{"(s)"} to guess the number:{" "}
						<Text style={styles.highlightNums}>{userNumber}</Text>
					</Text>
				</>
			);
			buttons = false;
		}

		setCurrentGuess(newRndNumber);

		numOfGuesses++;
	}

	function restartGame() {
		onNewGame(null);
		setCurrentGuess(null);
		replayButton = null;
		minBoundary = 1;
		maxBoundary = 100;
		buttons = true;
		numOfGuesses = 1;
	}

	return (
		<View style={styles.screen}>
			{buttons && <Title>Opponent's Guess</Title>}
			{buttons && <NumberContainer>{currentGuess}</NumberContainer>}
			{!buttons && (
				<NumberContainer
					textStyle={{ fontSize: 100, color: "#53FF15" }}
					style={{ width: 180, height: 180, borderRadius: 90 }}
				>
					{currentGuess}
				</NumberContainer>
			)}
			<View>
				<View style={styles.btnsContainer}>
					{buttons && (
						<View style={styles.buttons}>
							<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
								<Ionicons name="caret-down-outline" size={24} color="#00F804" />{" "}
								Lower
							</PrimaryButton>
							<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
								<Ionicons name="caret-up-outline" size={24} color="#00F804" />{" "}
								Higher
							</PrimaryButton>
						</View>
					)}
					{replayButton}
				</View>
			</View>
			{/* LOG ROUNDS */}
			<View style={styles.scoreContainer}>
				<LinearGradient
					colors={[
						Colors.gameScreen.recordsGrad1,
						Colors.gameScreen.recordsGrad2,
					]}
					style={styles.listContainer}
				>
					<View style={styles.labelsContainer}>
						<Text style={styles.labels}>guess</Text>
						<Text style={styles.labels}>number</Text>
					</View>
					<FlatList
						alwaysBounceVertical={true}
						data={scoreTable}
						renderItem={(itemData) => {
							return (
								<View key={itemData.item.key} style={styles.scoreElements}>
									<Text style={styles.scoreElement}>
										#{scoreTable.length - itemData.index}
									</Text>
									<Text style={styles.scoreElement}>{itemData.item.guess}</Text>
								</View>
							);
						}}
					/>
				</LinearGradient>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	buttons: {
		flexDirection: "row",
	},
	btnsContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	finalMessage: {
		// fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		color: Colors.gameScreen.message,
		margin: 15,
	},
	highlightNums: {
		fontWeight: "bold",
		fontSize: 24,
	},
	scoreContainer: {
		height: 230,
		width: "100%",
		flexDirection: "row",
		backgroundColor: Colors.gameScreen.scoreContainer,
		justifyContent: "center",
		marginTop: 20,
		padding: 8,
		borderRadius: 8,
	},
	listContainer: {
		flex: 1,
		borderRadius: 8,
	},
	labelsContainer: {
		flexDirection: "row",
		borderBottomWidth: 0.6,
		paddingBottom: 4,
		marginBottom: 8,
	},
	labels: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		// fontStyle: "italic",
		fontVariant: ["small-caps"],
	},
	scoreElements: {
		flexDirection: "row",
		// transform: [{ translateY: 10 }],
	},
	scoreElement: {
		flex: 1,
		textAlign: "center",
		overflow: "hidden",
		fontSize: 16,
		paddingBottom: 4,
		marginBottom: 8,
		borderBottomWidth: 0.5,
		// elevation: 2,
	},
});

export default GameScreen;
