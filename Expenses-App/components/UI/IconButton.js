import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../constants/colors";

const { iconPressed } = Colors.header;

const IconButton = ({ name, onPress, color, size }) => {
	return (
		<View style={styles.container}>
			<Pressable
				android_ripple={{ color: iconPressed }}
				onPress={onPress}
				style={({ pressed }) =>
					pressed ? [styles.pressed, styles.icon] : styles.icon
				}
			>
				<Icon name={name} size={size} color={color} />
			</Pressable>
		</View>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		overflow: "hidden",
		marginRight: 12,
	},
	icon: {
		padding: 6,
		justifyContent: "center",
	},
	pressed: {
		opacity: 0.7,
	},
});
