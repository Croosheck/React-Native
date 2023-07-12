import {
	StyleSheet,
	TextInput,
	View,
	Dimensions,
	ImageBackground,
	Pressable,
	Alert,
} from "react-native";
import { useState } from "react";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";

import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import uploadFile from "../../util/storage";

import * as ImagePicker from "expo-image-picker";
// import MaskedView from "@react-native-community/masked-view";
import MaskedView from "@react-native-masked-view/masked-view";
import OutlinedButton from "../UI/OutlinedButton";
import IconButton from "../UI/IconButton";

import { useIsFocused } from "@react-navigation/native";

export default function Register() {
	const isFocused = useIsFocused();

	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [image, setImage] = useState(null);
	const [passwordInvisible, setPasswordInvisible] = useState(true);

	const profileImageScale = useSharedValue(0);
	const buttonScale = useSharedValue(0);

	if (isFocused) {
		setTimeout(() => {
			buttonScale.value = withSpring(1, { mass: 0.8 });
		}, 700);
	}

	const reanimatedProfileImage = useAnimatedStyle(() => {
		return {
			transform: [{ scale: profileImageScale.value }],
		};
	});
	const reanimatedButton = useAnimatedStyle(() => {
		return {
			transform: [{ scale: buttonScale.value }],
		};
	});

	function inputHandler(type, text) {
		type === "name" &&
			setCredentials((current) => ({ ...current, name: text }));
		type === "email" &&
			setCredentials((current) => ({ ...current, email: text }));
		type === "password" &&
			setCredentials((current) => ({ ...current, password: text }));
	}

	async function pickImageHandler() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	}

	function signUpHandler() {
		const { name, email, password } = credentials;

		if (
			name.trim().length === 0 ||
			email.trim().length === 0 ||
			password.trim().length === 0
		) {
			Alert.alert(
				"*Beep Boop!* Distorted data!",
				"Something is missing! Over."
			);
			return;
		}

		if (password.trim().length < 6) {
			Alert.alert(
				"*Beep Boop!* Password too short!",
				"Must be at least 6 characters. Over."
			);
			return;
		}

		if (!image) {
			Alert.alert(
				"*Beep Boop!* No image detected!",
				"Profile image detection failed. Over."
			);
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (response) => {
				// // addDoc : Auto-created ID by Firestore
				// addDoc(collection(db, "users"), {
				// 	name: name,
				// 	email: email,
				// });

				// in setDoc ID must be specified
				await setDoc(doc(db, "users", auth.currentUser.uid), {
					name: name,
					email: email,
					registrationTimestamp: serverTimestamp(),

					// setDoc => updateDoc - updating a doc, without overwriting
					// setDoc => deleteDoc - deletes entire doc
					// deleteField()n e.g. email: deleteField()
				}).catch((error) => {
					Alert.alert("Something went wrong!", `${error.message}`);
				});
			})
			.catch((error) => {
				Alert.alert("Something went wrong!", `${error.message}`);
			});

		getAuth().onAuthStateChanged((user) => {
			if (user) {
				uploadFile(image, "profilePic");
			}
		});
	}

	function showPasswordHandler() {
		setPasswordInvisible(!passwordInvisible);
	}

	const pickedImage = !image ? (
		<Animated.View style={[styles.buttonContainer, reanimatedButton]}>
			<OutlinedButton textOnly={true}>Pick Profile Image</OutlinedButton>
		</Animated.View>
	) : (
		<View style={[styles.outerCircleImageMasked, { opacity: 1 }]}>
			<Animated.Image
				source={{ uri: image }}
				style={[styles.imageMasked, { opacity: 1 }, reanimatedProfileImage]}
				onLoadEnd={() =>
					(profileImageScale.value = withSpring(1, { mass: 0.8 }))
				}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			<MaskedView
				style={styles.maskedViewContainer}
				maskElement={
					<View style={styles.maskElement}>
						{pickedImage}
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="name"
								onChangeText={inputHandler.bind(this, "name")}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="email"
								onChangeText={inputHandler.bind(this, "email")}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="password"
								onChangeText={inputHandler.bind(this, "password")}
							/>
						</View>
						<Animated.View style={[styles.buttonContainer, reanimatedButton]}>
							<OutlinedButton onPress={signUpHandler} icon="pencil">
								Sign Up
							</OutlinedButton>
						</Animated.View>
					</View>
				}
				// Animations
				androidRenderingMode="software"

				// Performance
				// androidRenderingMode="hardware"
			>
				<ImageBackground
					style={styles.backgroundImage}
					source={require("../../assets/background13.jpg")}
				>
					<View style={styles.maskElement}>
						{!image ? (
							<View style={styles.buttonContainer}>
								<OutlinedButton
									onPress={pickImageHandler}
									textOnly={true}
									invisible={true}
								>
									Pick Profile Image
								</OutlinedButton>
							</View>
						) : (
							<Pressable onPress={pickImageHandler}>
								<ImageBackground
									source={{ uri: image }}
									style={styles.imageBackgroundContainer}
									imageStyle={styles.backgroundImageStyle}
								>
									<View
										source={{ uri: image }}
										imageStyle={styles.backgroundImageStyle}
										style={styles.innerView}
									></View>
								</ImageBackground>
							</Pressable>
						)}
						<View style={[styles.inputContainer, { opacity: 0.8 }]}>
							<TextInput
								placeholder="name"
								onChangeText={inputHandler.bind(this, "name")}
								value={credentials.name}
								style={styles.input}
							/>
						</View>
						<View style={[styles.inputContainer, { opacity: 0.8 }]}>
							<TextInput
								placeholder="email"
								onChangeText={inputHandler.bind(this, "email")}
								value={credentials.email}
								style={styles.input}
							/>
						</View>
						<View style={[styles.inputContainer, { opacity: 0.8 }]}>
							<TextInput
								placeholder="password"
								onChangeText={inputHandler.bind(this, "password")}
								value={credentials.password}
								style={[styles.input, { width: "85%" }]}
								secureTextEntry={passwordInvisible}
							/>
							<IconButton
								icon="ios-eye-outline"
								color="#000000"
								size={22}
								onPress={showPasswordHandler}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<OutlinedButton
								onPress={signUpHandler}
								textOnly={true}
								invisible={true}
								icon="pencil"
							>
								Sign Up
							</OutlinedButton>
						</View>
					</View>
				</ImageBackground>
			</MaskedView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#220E0E",
	},
	maskedViewContainer: {
		flex: 1,
	},
	maskElement: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	outerCircleImageMasked: {
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get("window").width / 1.65, // A 1
		height: Dimensions.get("window").width / 1.65, // A 2
		borderRadius: Dimensions.get("window").width / 3,
		borderWidth: 7,
		marginBottom: 12,
	},
	imageMasked: {
		width: Dimensions.get("window").width / 1.58, // B 1
		height: Dimensions.get("window").width / 1.58, // B 2
		borderRadius: Dimensions.get("window").width / 3.1, // B 3
	},
	// if WxH in imageMasked > WxH in imageBackgroundContainer, masked ring is inside image
	imageBackgroundContainer: {
		width: Dimensions.get("window").width / 1.65, // A 1
		height: Dimensions.get("window").width / 1.65, // A 2
		marginBottom: 12,
	},
	backgroundImageStyle: {
		borderWidth: 8,
		borderColor: "#220E0E",
		borderRadius: Dimensions.get("window").width / 3,
	},
	innerView: {
		//////// Applicable, if WxH in imageMasked > WxH in imageBackgroundContainer
		// width: Dimensions.get("window").width / 1.85, // B 1
		// height: Dimensions.get("window").width / 1.85, // B 2
		// borderRadius: Dimensions.get("window").width / 3.7, // B 3
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		marginVertical: 8,
		height: 40,
		width: "60%",
		borderWidth: 1,
		borderRadius: 14,
		backgroundColor: "#DFDFDF",
		borderWidth: 1,
	},
	input: {
		width: "100%",
		fontWeight: "bold",
	},
	buttonContainer: {
		width: "50%",
		marginBottom: 80, // top button
		marginTop: 24, // bottom button
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
	},
});
