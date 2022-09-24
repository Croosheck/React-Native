import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const OutlinedButton = ({
	onPress,
	icon,
	size = 18,
	children,
	highlighted,
	iconRight,
	textOnly,
	invisible,
	iconOnly,
	style,
}) => {
	return (
		<>
			{textOnly ? (
				<Pressable
					onPress={onPress}
					style={({ pressed }) => [
						styles.button,
						{ ...style },
						highlighted && styles.highlighted,
						invisible && styles.invisible,
						pressed && styles.pressed,
					]}
				>
					<Text style={styles.text}>{children}</Text>
				</Pressable>
			) : (
				<Pressable
					onPress={onPress}
					style={({ pressed }) => [
						styles.button,
						{ ...style },
						highlighted && styles.highlighted,
						invisible && styles.invisible,
						pressed && styles.pressed,
					]}
				>
					{iconRight ? (
						<>
							{iconOnly || (
								<Text style={[styles.text, { marginRight: 2 }]}>
									{children}
								</Text>
							)}
							<Ionicons
								name={icon}
								size={size}
								color={"#FFFFFF"}
								style={styles.iconRight}
							/>
						</>
					) : (
						<>
							<Ionicons
								name={icon}
								size={size}
								color={"#FFFFFF"}
								style={styles.iconLeft}
							/>
							{iconOnly || (
								<Text style={[styles.text, { marginLeft: 2 }]}>{children}</Text>
							)}
						</>
					)}
				</Pressable>
			)}
		</>
	);
};

export default OutlinedButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
		margin: 4,
		borderWidth: 1,
		borderColor: "#ffffff",
		borderRadius: 8,
	},
	highlighted: {
		backgroundColor: "#FFB121",
	},
	invisible: {
		opacity: 0,
	},
	pressed: {
		opacity: 0.7,
		backgroundColor: "#C29A9A6B",
	},
	iconRight: {
		marginLeft: 6,
	},
	iconLeft: {
		// marginRight: 6,
		// borderWidth: 2,
		// borderColor: "#ffffff",
		// position: "absolute",
		transform: [
			{
				scale: 1,
			},
			// {
			// 	translateX: Dimensions.get("window").width / 2,
			// },
			// {
			// 	translateY: Dimensions.get("window").height / 2,
			// },
		],
	},
	text: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
