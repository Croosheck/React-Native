import React, { useState } from "react";
import {
	Alert,
	ImageBackground,
	StyleSheet,
	TextInput,
	View,
} from "react-native";

import { auth, db } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

import MaskedView from "@react-native-masked-view/masked-view";
import OutlinedButton from "../UI/OutlinedButton";

export default function Login() {
	const [credentials, setCredentials] = useState({
		email: "BMine@BMine.com",
		password: "123123",
		name: "",
	});

	function inputHandler(type, text) {
		type === "name" &&
			setCredentials((current) => ({ ...current, name: text }));
		type === "email" &&
			setCredentials((current) => ({ ...current, email: text }));
		type === "password" &&
			setCredentials((current) => ({ ...current, password: text }));
	}

	async function signUpHandler() {
		// Logging it with email/password
		const { email, password } = credentials;
		const response = await signInWithEmailAndPassword(
			auth,
			email,
			password
		).catch((error) => {
			Alert.alert(`${error.message}`, "Check Your credentials and try again.");
			return;
		});

		// Before updating a doc, check if user successfully logged in
		getAuth().onAuthStateChanged((user) => {
			if (!user) return;
		});

		// Updates (or creates, if 1st time logging in) log in timestamp field in firestore doc
		await updateDoc(doc(db, "users", auth.currentUser.uid), {
			lastTimeLoggedIn: serverTimestamp(),
		}).catch((error) => {
			console.log(error.message);
		});

		// console.log(response);
	}

	return (
		// MASKED elements
		<View style={styles.container}>
			<MaskedView
				style={styles.maskedViewContainer}
				maskElement={
					<View style={styles.maskElement}>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="email"
								onChangeText={inputHandler.bind(this, "email")}
								value={credentials.email}
								style={styles.input}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="password"
								onChangeText={inputHandler.bind(this, "password")}
								value={credentials.password}
								style={styles.input}
								secureTextEntry={true}
							/>
						</View>

						<View style={styles.buttonContainer}>
							<OutlinedButton
								icon="lock-open-outline"
								size={22}
								iconOnly={true}
							>
								Log In
							</OutlinedButton>
						</View>
					</View>
				}
				// for best performance //
				androidRenderingMode="hardware"

				// for animating (allows component updates) //
				// androidRenderingMode="software"
			>
				<ImageBackground // MASKING elements
					style={styles.backgroundImage}
					source={require("../../assets/uwp108849b.gif")}
				>
					<View style={styles.maskElement}>
						<View style={[styles.inputContainer, { opacity: 0.8 }]}>
							<TextInput
								placeholder="email"
								onChangeText={inputHandler.bind(this, "email")}
								value={credentials.email}
								style={styles.input}
								selectionColor="#00000091"
							/>
						</View>
						<View style={[styles.inputContainer, { opacity: 0.8 }]}>
							<TextInput
								placeholder="password"
								onChangeText={inputHandler.bind(this, "password")}
								value={credentials.password}
								style={styles.input}
								secureTextEntry={true}
								selectionColor="#00000091"
							/>
						</View>
						<View style={styles.buttonContainer}>
							<OutlinedButton
								onPress={signUpHandler}
								icon="lock-open-outline"
								size={22}
								iconOnly={true}
								invisible={true}
							>
								Log In
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
	inputContainer: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginVertical: 8,
		height: 40,
		width: "60%",
		borderWidth: 1,
		borderRadius: 14,
		backgroundColor: "#DFDFDF",
		borderWidth: 1,
	},
	input: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
	},
	buttonContainer: {
		marginTop: 16,
		width: "30%",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
	},
});
