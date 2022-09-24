import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/colors";

const LoadingOverlay = () => {
	const [timeState, setTimeState] = useState(false);

	setTimeout(() => {
		setTimeState(true);
	}, 5000);

	return (
		<View style={styles.contaniner}>
			<ActivityIndicator size="large" color="white" style={styles.spinner} />
			{timeState && (
				<View style={styles.textContainer}>
					<Text style={styles.text}>It takes longer than expected.</Text>
					<Text style={styles.text}>Try to restart the app.</Text>
				</View>
			)}
		</View>
	);
};

export default LoadingOverlay;

const styles = StyleSheet.create({
	contaniner: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.appContainer.background,
	},
	spinner: {},
	textContainer: {},
	text: {
		textAlign: "center",
		color: "#ffffff",
		fontSize: 16,
	},
});
