import { useEffect, useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { uploadBytesResumable } from "firebase/storage";

import uploadFile from "../../util/storage";
import { getAddress } from "../../util/location";
import OutlinedButton from "../UI/OutlinedButton";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Save({ navigation, route }) {
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [uploadProgress, setUploadProgress] = useState();
	const [uploadedDone, setUploadedDone] = useState(false);
	const [address, setAddress] = useState();
	const [editableInput, setEditableInput] = useState(true);

	const { image, pickedLocation } = route.params;

	let infoTimer;

	const inputOpacity = useSharedValue(1);
	const buttonTranslate = useSharedValue(0);
	const translateY = Dimensions.get("window").width / 4;

	const progressOpacity = useSharedValue(1);

	const reanimatedInput = useAnimatedStyle(() => {
		return {
			opacity: inputOpacity.value,
		};
	});
	const reanimatedButton = useAnimatedStyle(() => {
		return {
			translateY: buttonTranslate.value,
		};
	});
	const reanimatedProgress = useAnimatedStyle(() => {
		return {
			opacity: progressOpacity.value,
		};
	});

	function timeout() {
		infoTimer = setTimeout(() => {
			setUploadProgress(null);
			return clearTimeout(infoTimer);
		}, 3000);
	}

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const fetchedAddress = await getAddress(
					pickedLocation.lat,
					pickedLocation.lng
				);
				setAddress(fetchedAddress);
			}
		}

		handleLocation();

		return clearTimeout(infoTimer);
	}, [pickedLocation]);

	async function uploadFileHandler() {
		if (title.trim().length === 0 || description.trim().length === 0) {
			Alert.alert("Empty fields!", "Each field must contain something.");
			return;
		}

		// Uploading the image post to Firebase Storage
		// and details to Firestore ("posts" collection)
		const {
			imagesRef,
			blob,
			formatedDate: filename,
		} = await uploadFile(image, "newPost", {
			title: title,
			description: description,
			address: address,
			coords: pickedLocation,
		});

		// Upload progress preview
		uploadBytesResumable(imagesRef, blob).on(
			"state_changed",
			async (snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				const progressFormatted = Math.floor(progress).toString();
				setUploadProgress(
					<Text style={styles.text}>
						Upload is
						<Text style={styles.progressText}> {progressFormatted}% </Text>
						done
					</Text>
				);

				// Change progress label, when completed
				if (progress === 100) {
					setEditableInput(false);

					setUploadProgress(
						<Text style={styles.progressText}>Upload completed!</Text>
					);

					inputOpacity.value = withTiming(0, { duration: 900 });
					buttonTranslate.value = withTiming(-translateY, { duration: 1000 });

					setTimeout(() => {
						setUploadedDone(true);
					}, 1000);
					timeout();
					progressOpacity.value = withTiming(0, { duration: 2800 });
				}
			}
		);
	}

	function titleHandler(text) {
		setTitle(text);
	}

	function descriptionHandler(text) {
		setDescription(text);
	}

	function backToMainPageHandler() {
		navigation.navigate("Feed");
	}

	const toggleButton = uploadedDone ? (
		<OutlinedButton onPress={backToMainPageHandler} textOnly={true}>
			Close
		</OutlinedButton>
	) : (
		<OutlinedButton onPress={uploadFileHandler} icon="cloud-upload-outline">
			Upload
		</OutlinedButton>
	);

	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.scrollContent}
			>
				<Image source={{ uri: image }} style={styles.image} />
				<Animated.View style={reanimatedInput}>
					<Text style={styles.address}>{address}</Text>
				</Animated.View>
				<View style={styles.inputContainer}>
					<Animated.View style={[styles.input, reanimatedInput]}>
						<TextInput
							placeholder="Title"
							onChangeText={titleHandler}
							value={title}
							multiline={false}
							selectionColor="#00000039"
							editable={editableInput}
						/>
					</Animated.View>
					<Animated.View
						style={[styles.input, { minHeight: 60 }, reanimatedInput]}
					>
						<TextInput
							placeholder="Description"
							onChangeText={descriptionHandler}
							value={description}
							multiline={true}
							selectionColor="#00000039"
							editable={editableInput}
						/>
					</Animated.View>
				</View>
				<Animated.View style={[styles.buttonContainer, reanimatedButton]}>
					{toggleButton}
				</Animated.View>
				<Animated.View style={[styles.progressContainer, reanimatedProgress]}>
					{uploadProgress ? (
						uploadProgress
					) : (
						<Text style={styles.progressText}></Text>
					)}
				</Animated.View>
			</ScrollView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#361A1A",
		paddingTop: 8,
	},
	scrollContent: {
		alignItems: "center",
	},
	image: {
		width: Dimensions.get("window").width - 40,
		minHeight: Dimensions.get("window").width - 40,
		maxHeight: "60%",
		marginTop: 8,
		borderWidth: 2,
		borderColor: "#4B3421",
		borderRadius: 4,
	},
	address: {
		color: "#ffffff",
		fontSize: 15,
		marginVertical: 8,
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		padding: 4,
		paddingHorizontal: 8,
		marginVertical: 8,
		backgroundColor: "#DBDADA",
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	progressContainer: {
		flex: 0.2,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		color: "#BEE9FF",
	},
	progressText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#BEE9FF",
	},
	buttonContainer: {
		flex: 0.4,
		marginTop: 8,
	},
});
