import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

function Title({ children }) {
	return (
		<LinearGradient
			style={styles.linearGradient}
			colors={[Colors.title.grad1, Colors.title.grad2]}
		>
			<Text style={styles.title}>{children}</Text>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans",
		fontSize: 24,
		// fontWeight: "bold",
		color: Colors.title.text,
		textAlign: "center",
		borderWidth: 3,
		borderColor: Colors.title.border,
		padding: 16,
		borderRadius: 5,
	},
	linearGradient: {
		borderRadius: 5,
		opacity: 0.8,
	},
});

export default Title;
