import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/colors";
import Button from "./Button";

const ErrorOverlay = ({ message, onConfirm }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occured!</Text>
			<Text style={[styles.text, styles.message]}>{message}</Text>
			<Button onPress={onConfirm}>Okay</Button>
		</View>
	);
};

export default ErrorOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.appContainer.background,
	},
	text: {
		textAlign: "center",
		marginBottom: 8,
		color: "#ffffff",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
	},
	message: {
		fontSize: 18,
	},
});
