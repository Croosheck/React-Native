import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function IconButton({ isActive, onPress }) {
	return (
		<View style={styles.headerButtonContainer}>
			<Pressable
				style={({ pressed }) => {
					return [
						pressed
							? [styles.headerButton, { opacity: 0.7 }]
							: styles.headerButton,
					];
				}}
				onPress={onPress}
			>
				<Icon
					name="heart"
					size={30}
					style={[
						styles.buttonIcon,
						{
							color: isActive ? "#FB0000" : "white",
							opacity: isActive ? 1 : 0.7,
						},
					]}
				/>
			</Pressable>
		</View>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	headerButtonContainer: {
		// borderWidth: 2,
		// borderColor: "#ffffff",
		// padding: 8,
		margin: 2,
	},
	headerButton: {},
	buttonIcon: {},
});
