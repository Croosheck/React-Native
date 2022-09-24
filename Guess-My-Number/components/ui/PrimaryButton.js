import { Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress }) {
	return (
		<LinearGradient
			colors={[Colors.button.btnGrad1, Colors.button.btnGrad2]}
			style={styles.buttonOuterContainer}
		>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed]
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: Colors.button.btnRipple }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</LinearGradient>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		// backgroundColor: "#420624",
		// elevation: 4,
	},
	buttonText: {
		color: Colors.button.text,
		textAlign: "center",
		fontSize: 24,
		padding: 4,
		fontWeight: "bold",
	},
	pressed: {
		opacity: 0.8,
	},
});
