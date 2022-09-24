import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

function NumberContainer({ children, style, textStyle }) {
	return (
		<LinearGradient
			style={{ ...styles.container, ...style }}
			colors={[Colors.numberContainer.grad1, Colors.numberContainer.grad2]}
		>
			<Text style={{ ...styles.numberText, ...textStyle }}>{children}</Text>
		</LinearGradient>
	);
}

export default NumberContainer;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: Colors.numberContainer.border,
		// padding: 16,
		margin: 24,
		width: 110,
		height: 110,
		borderRadius: 55,
	},
	numberText: {
		color: Colors.numberContainer.text,
		fontSize: 36,
		fontWeight: "bold",
	},
});
