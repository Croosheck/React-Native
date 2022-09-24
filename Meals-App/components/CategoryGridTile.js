import {
	ImageBackground,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function CategoryGridTile({ id, title, color, onPress, img }) {
	return (
		<LinearGradient colors={["#FFFFFF", "#6F6060"]} style={styles.gridItem}>
			<ImageBackground
				source={img}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={styles.backgroundImage}
			>
				<Pressable
					android_ripple={{ color: "#CCCCCC80" }}
					style={({ pressed }) => {
						return [styles.button, pressed ? styles.buttonPressed : null];
					}}
					onPress={onPress}
					id={id}
				>
					<View
						style={
							styles.innerContainer
							// { backgroundColor: color }
						}
					>
						<LinearGradient
							style={styles.innerContainer}
							colors={["#FFFFFF60", "#00000040"]}
						>
							<Text style={styles.title} numberOfLines={1}>
								{title}
							</Text>
						</LinearGradient>
					</View>
				</Pressable>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 8,
		height: 150,
		borderRadius: 6,
		elevation: 4,
		//ios
		//need backgroundColor to make a shadow works on ios
		shadowColor: "black",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		overflow: Platform.select({ android: "hidden", ios: "visible" }),
	},
	rootScreen: {
		flex: 1,
		justifyContent: "center",
		borderRadius: 5,
		overflow: "hidden",
		margin: 2,
	},
	backgroundImage: {
		opacity: 0.95,
	},
	button: {
		flex: 1,
	},
	//ios
	buttonPressed: {
		opacity: 0.7,
		backgroundColor: "#01010183",
	},
	innerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		// padding: 16,
		// borderRadius: 16,
	},
	title: {
		flex: 1,
		fontWeight: "bold",
		fontSize: 20,
		fontVariant: ["small-caps"],
		textAlign: "center",
		color: "#FFFFFF",
		// backgroundColor: "#FF00001B",
		// borderRadius: 12,
	},
});

export default CategoryGridTile;
