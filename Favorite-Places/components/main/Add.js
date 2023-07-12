import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import {
	launchCameraAsync,
	launchImageLibraryAsync,
	MediaTypeOptions,
} from "expo-image-picker";

import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";

import { useIsFocused } from "@react-navigation/native";

import { getMapPreview } from "../../util/location";
import OutlinedButton from "../UI/OutlinedButton";

export default function Add({ navigation, route }) {
	const isFocused = useIsFocused();

	const [image, setImage] = useState();
	const [pickedLocation, setPickedLocation] = useState();

	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	const buttonScale = useSharedValue(1);
	const imageScale = useSharedValue(0);
	const mapScale = useSharedValue(0);

	const reanimatedButton = useAnimatedStyle(() => {
		return {
			transform: [{ scale: buttonScale.value }],
		};
	});

	const reanimatedImage = useAnimatedStyle(() => {
		return {
			transform: [{ scale: imageScale.value }],
		};
	});

	const reanimatedMap = useAnimatedStyle(() => {
		return {
			transform: [{ scale: mapScale.value }],
		};
	});

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			};

			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	// Button bounce effect
	if (image) {
		// Assigning 1 back to buttonScale.value, to avoid nesting animations
		buttonScale.value = 1;
		buttonScale.value = withRepeat(withSpring(1.1), -1, true);
	}

	// Permisions for getting user's location
	async function verifyPermissions() {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			// wait for user's response
			const permissionResponse = await requestPermission();

			// True if granted, false otherwise
			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant location permissions to use this feature.",
				[
					{
						onPress: async () => {
							const permissionResponse = await requestPermission();
						},
						style: "default",
						text: "OK",
					},
				]
			);
			return locationPermissionInformation.granted;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) return;

		const location = await getCurrentPositionAsync({ accuracy: 2 });
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	async function takeImageHandler() {
		const image = await launchCameraAsync({
			quality: 1,
			allowsEditing: true,
			aspect: [1, 1],
		});

		setImage(image.uri);
	}

	const pickImage = async () => {
		let result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	function savePicture() {
		navigation.navigate("Save", { image, pickedLocation });
	}

	function goBackHandler() {
		navigation.goBack();
	}

	async function pickOnMapHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;

		const location = await getCurrentPositionAsync({ accuracy: 2 });

		navigation.navigate("Map", {
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	function resetHandler() {
		setTimeout(() => {
			setImage(null);
			setPickedLocation(null);
		}, 100);
		imageScale.value = withTiming(0, { duration: 200 });
		mapScale.value = withTiming(0, { duration: 200 });
	}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		let mapPreview = getMapPreview(pickedLocation.lat, pickedLocation.lng);

		locationPreview = (
			<Animated.Image
				source={{
					uri: mapPreview,
				}}
				style={[styles.imgPreview, reanimatedMap]}
				onLoad={() => (mapScale.value = withSpring(1, { mass: 0.63 }))}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{image && (
					<Animated.Image
						source={{ uri: image }}
						style={[styles.image, reanimatedImage]}
						onLoadEnd={() => (imageScale.value = withSpring(1, { mass: 0.63 }))}
					/>
				)}
			</View>
			<View style={styles.topButtons}>
				{!image ? (
					<>
						<View style={styles.button}>
							<OutlinedButton onPress={goBackHandler} icon="arrow-back">
								Back
							</OutlinedButton>
						</View>
						<View style={styles.button}>
							<OutlinedButton
								onPress={takeImageHandler}
								icon="camera-outline"
								iconOnly={true}
							/>
						</View>
						<View style={styles.button}>
							<OutlinedButton onPress={pickImage} icon="albums-outline">
								Gallery
							</OutlinedButton>
						</View>
					</>
				) : (
					<>
						<View style={styles.button}>
							<OutlinedButton onPress={goBackHandler} icon="arrow-back">
								Back
							</OutlinedButton>
						</View>
						<View style={styles.button}>
							<OutlinedButton onPress={resetHandler} icon="trash-outline">
								Reset
							</OutlinedButton>
						</View>
						<Animated.View style={[styles.button, reanimatedButton]}>
							<OutlinedButton
								onPress={savePicture}
								icon="arrow-forward"
								highlighted={true}
								iconRight={true}
							>
								Next Step
							</OutlinedButton>
						</Animated.View>
					</>
				)}
			</View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.bottomButtons}>
				<View style={styles.button}>
					<OutlinedButton onPress={getLocationHandler} icon="locate">
						Locate User
					</OutlinedButton>
				</View>
				<View style={styles.button}>
					<OutlinedButton onPress={pickOnMapHandler} icon="location-outline">
						Pick on Map
					</OutlinedButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 8,
		alignItems: "center",
		justifyContent: "flex-start",
		// backgroundColor: "#FF9E9E",
		// backgroundColor: "#361A1A",
		backgroundColor: "#220E0E",
	},
	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 4,
		borderWidth: 2,
		width: Dimensions.get("window").height / 2 - 16,
		height: Dimensions.get("window").height / 2 - 16,
		borderRadius: 4,
		borderColor: "#9B6F6276",
	},
	image: {
		width: Dimensions.get("window").height / 2 - 20,
		height: Dimensions.get("window").height / 2 - 20,
		borderRadius: 2,
	},
	mapPreview: {
		width: "90%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#CD8A8A",
		borderRadius: 4,
		overflow: "hidden",
		borderWidth: 1,
	},
	imgPreview: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
	},
	topButtons: {
		flexDirection: "row",
		justifyContent: "center",
		width: "50%",
	},
	// fixedRatio: {
	// 	flex: 1,
	// 	aspectRatio: 1,
	// },
	bottomButtons: {
		justifyContent: "center",
		alignItems: "center",
		width: "75%",
		flexDirection: "row",
	},
	button: {
		width: "60%",
		marginHorizontal: 4,
		marginBottom: 4,
	},
});
