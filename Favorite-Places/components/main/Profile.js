import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { useDispatch, useSelector } from "react-redux";
import { clearPlaces, logoutUser } from "../../redux/reducers/slices";

import { auth, storage } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

export default function Profile() {
	const [fetchedImage, setFetchedImage] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);

	const profileImageScale = useSharedValue(0);
	const profileImageRotate = useSharedValue(0);
	const profileOpacity = useSharedValue(0);
	const profileNameOpacity = useSharedValue(0);
	const borderWidth = useSharedValue(30);

	const reanimatedProfileImage = useAnimatedStyle(() => {
		return {
			transform: [{ scale: profileImageScale.value }],
			opacity: profileOpacity.value,
		};
	});
	const reanimatedBorder = useAnimatedStyle(() => {
		return {
			borderWidth: borderWidth.value,
		};
	});
	const reanimatedLogout = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${profileImageRotate.value}deg` }],
		};
	});
	const profileName = useAnimatedStyle(() => {
		return {
			opacity: profileNameOpacity.value,
		};
	});

	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.currentUser);

	const profilePicRef = ref(
		storage,
		`users/${auth.currentUser.uid}/profilePic/defaultProfile.jpg`
	);

	useEffect(() => {
		async function getProfilePic() {
			const pic = await getDownloadURL(profilePicRef);
			setFetchedImage(pic);
		}

		getProfilePic();
	}, []);

	function logoutHandler() {
		signOut(auth);
		dispatch(logoutUser());
		dispatch(clearPlaces());
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Animated.View
					style={[
						styles.profilePicContainer,
						reanimatedLogout,
						imageLoaded && reanimatedBorder,
					]}
				>
					{fetchedImage && (
						<Animated.Image
							source={{ uri: fetchedImage }}
							style={[styles.profilePic, reanimatedProfileImage]}
							onLoadEnd={() => {
								setImageLoaded(true);
								profileImageScale.value = withSpring(1, { mass: 0.8 });
								profileOpacity.value = withTiming(1, { duration: 500 });
								const loadBorderTimeout = setTimeout(() => {
									profileNameOpacity.value = withTiming(1, { duration: 1000 });
									borderWidth.value = withSpring(3);
									clearTimeout(loadBorderTimeout);
								}, 700);
							}}
						/>
					)}
				</Animated.View>

				{user && (
					<Animated.Text style={[styles.text, profileName]}>
						{user.name}
					</Animated.Text>
				)}
			</View>
			<Animated.View style={[styles.buttonContainer, reanimatedProfileImage]}>
				{fetchedImage && (
					<OutlinedButton
						onPress={() => {
							borderWidth.value = withTiming(0, { duration: 400 });
							profileImageScale.value = withTiming(0, { duration: 800 });
							profileOpacity.value = withTiming(0, { duration: 800 });
							profileNameOpacity.value = withTiming(0, { duration: 600 });
							// profileImageRotate.value = withTiming(360, { duration: 1000 });
							const logoutTimeout = setTimeout(() => {
								logoutHandler();
								clearTimeout(logoutTimeout);
							}, 1000);
						}}
						icon="log-out-outline"
					>
						Logout
					</OutlinedButton>
				)}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#220E0E",
	},
	profileContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	profilePicContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get("window").width / 1.59,
		height: Dimensions.get("window").width / 1.59,
		borderRadius: Dimensions.get("window").width / 3.18,
		marginBottom: 24,
		backgroundColor: "#220E0E",
		borderColor: "#69B9FF",
		// elevation: 8,
	},
	profilePic: {
		width: Dimensions.get("window").width / 1.72,
		height: Dimensions.get("window").width / 1.72,
		borderRadius: Dimensions.get("window").width / 3.44,
	},
	text: {
		fontSize: 26,
		marginBottom: 24,
		fontWeight: "bold",
		color: "#BED4FF",
	},
	buttonContainer: {
		flex: 0.5,
	},
});
