import {
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

const PlaceItem = ({ place, onSelect }) => {
	const postScale = useSharedValue(0);
	const postOpacity = useSharedValue(0);

	const reanimatedPost = useAnimatedStyle(() => {
		return {
			transform: [{ scale: postScale.value }],
			opacity: postOpacity.value,
		};
	});

	postScale.value = withSpring(1, { mass: 0.63 });
	postOpacity.value = withTiming(1, { duration: 1000 });

	const postDate = new Date(place.timestamp);

	const formatedDate = `${postDate.getDate()}-${
		postDate.getMonth() + 1
	}-${postDate.getFullYear()}    ${postDate.toLocaleTimeString()}`;

	return (
		<Animated.View style={reanimatedPost}>
			<LinearGradient
				// colors={["#0F4E8885", "#2AA3FF", "transparent"]}
				// colors={["#D15B5B8A", "#000000", "transparent"]}
				colors={["#A07C7C90", "#000000", "transparent"]}
				style={styles.gradientContainer}
			>
				<Pressable
					android_ripple={{ color: "#cccccc", borderless: true }}
					onPress={onSelect.bind(this, place.id)}
					style={({ pressed }) => [styles.item, pressed && styles.pressed]}
				>
					<ImageBackground
						source={{ uri: place.imageUri }}
						style={styles.imageBackgroundContainer}
						imageStyle={styles.imageBackground}
					>
						<Text style={styles.postDate}>{formatedDate}</Text>
					</ImageBackground>
					<View style={styles.info}>
						<Text
							style={[
								styles.title,
								place.title.length > 30 && { fontSize: 16 },
							]}
						>
							{place.title}
						</Text>
						<Text
							style={[
								styles.address,
								place.address.length > 44 && { fontSize: 13 },
							]}
						>
							{place.address}
						</Text>
					</View>
				</Pressable>
			</LinearGradient>
		</Animated.View>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({
	gradientContainer: {
		borderWidth: 0.7,
		borderColor: "#CDE8FF",
		borderRadius: 8,
		marginVertical: 8,
	},
	item: {
		alignItems: "center",
		borderRadius: 6,
		borderRadius: 8,
		marginVertical: 6,
		padding: 8,
		height: Dimensions.get("window").width * 0.62,
		overflow: "hidden",
	},
	pressed: {
		opacity: 0.8,
	},
	imageBackgroundContainer: {
		borderRadius: 8,
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.47,
	},
	imageBackground: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#B7B7B7",
	},
	postDate: {
		textAlign: "center",
		backgroundColor: "#2726267D",
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
		marginVertical: 2,
		marginHorizontal: 2,
		fontWeight: "bold",
		color: "#EDEDED",
	},
	info: {
		flex: 2,
		marginTop: 4,
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		color: "#85DAFF",
		textAlign: "center",
	},
	address: {
		fontSize: 15,
		color: "#FFFFFF",
		textAlign: "center",
	},
});
