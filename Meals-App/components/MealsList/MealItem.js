import {
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function MealItem({
	title,
	imageUrl,
	duration,
	complexity,
	affordability,
	mealName,
	mealId,
}) {
	const navigation = useNavigation();
	function openDetailsHandler() {
		navigation.navigate("MealDetails", {
			mealName: mealName,
			mealId: mealId,
		});
	}

	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: "#7BD4F7" }}
				style={({ pressed }) => {
					return pressed ? styles.buttonPressed : null;
				}}
				onPress={openDetailsHandler}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={{ uri: imageUrl }} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.detailItem}>⌚ {duration}m</Text>
						<Text style={styles.detailItem}>🧩 {complexity.toUpperCase()}</Text>
						<Text style={styles.detailItem}>
							💲 {affordability.toUpperCase()}
						</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

export default MealItem;

const styles = StyleSheet.create({
	mealItem: {
		margin: 16,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "white",
		elevation: 8,
		backgroundColor: "white",
		shadowColor: "black",
		shadowOpacity: 0.35,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 12,
		overflow: Platform.select({ android: "hidden" }),
		borderWidth: 2,
		borderColor: "#63C8E1",
	},
	buttonPressed: {
		opacity: 0.8,
	},
	innerContainer: {
		borderRadius: 8,
		overflow: Platform.select({ ios: "hidden" }),
	},
	image: {
		width: "100%",
		height: 200,
		// borderRadius: 16,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
		fontStyle: "italic",
		padding: 8,
	},
	details: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	detailItem: {
		marginHorizontal: 4,
		fontSize: 12,
	},
});
