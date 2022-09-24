import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const { container, flatContainer, pressedBackground, title, flatTitle } =
	Colors.button;

const Button = ({ children, onPress, mode, style }) => {
	return (
		<View style={[styles.container, mode === "flat" && styles.flat, style]}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) =>
					pressed && [styles.pressed, mode === "flat" && styles.flatPressed]
				}
			>
				<View style={styles.textContainer}>
					<Text style={[styles.title, mode === "flat" && styles.flatTitle]}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 16,
		backgroundColor: container,
		justifyContent: "center",
		overflow: "hidden",
		maxHeight: 60,
		maxWidth: 150,
	},
	flat: {
		backgroundColor: flatContainer,
	},
	pressed: {
		flex: 1,
		opacity: 0.7,
		backgroundColor: pressedBackground,
		borderRadius: 4,
		maxHeight: 60,

		// no bouncing :(
		justifyContent: "center",
	},
	flatPressed: {
		flex: 1,
		opacity: 0.6,
		backgroundColor: null,
		borderRadius: 4,
	},
	textContainer: {},
	title: {
		color: title,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 24,
		marginHorizontal: 24,
	},
	flatTitle: {
		color: flatTitle,
		fontWeight: "bold",
		fontSize: 22,
	},
});
