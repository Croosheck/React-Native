import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";

export default function App() {
	const [userNumber, setUserNumber] = useState(null);
	const [background, setBackground] = useState(
		require(`./assets/images/background.png`)
	);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	function pickedNumberHandler(pickedNumber) {
		setUserNumber(pickedNumber);
	}

	function newGame(restart) {
		setBackground(require(`./assets/images/background.png`));
		setUserNumber(restart);
	}

	function gameOverHandler() {
		setBackground(require(`./assets/images/success.png`));
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen
				onNewGame={newGame}
				userNumber={userNumber}
				onGameOver={gameOverHandler}
			/>
		);
	}

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient
				colors={[
					Colors.app.backgroundGradient1,
					Colors.app.backgroundGradient2,
				]}
				style={styles.rootScreen}
			>
				<ImageBackground
					source={background}
					resizeMode="cover"
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
		justifyContent: "center",
	},
	backgroundImage: {
		opacity: 0.3,
	},
});
