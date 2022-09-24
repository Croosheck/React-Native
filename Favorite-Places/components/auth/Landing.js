import { ImageBackground, StyleSheet, Text, View } from "react-native";

import MaskedView from "@react-native-masked-view/masked-view";
import OutlinedButton from "../UI/OutlinedButton";

export default function Landing({ navigation }) {
	function changeToRegisterHandler() {
		navigation.navigate("Register");
	}
	function changeToLoginHandler() {
		navigation.navigate("Login");
	}

	return (
		<View style={styles.container}>
			<MaskedView
				style={styles.maskedViewContainer}
				maskElement={
					<View style={styles.maskElement}>
						<Text style={styles.title}>BMine</Text>
						<View style={styles.buttons}>
							<View style={styles.button}>
								<OutlinedButton textOnly={true}>Register</OutlinedButton>
							</View>
							<View style={styles.button}>
								<OutlinedButton textOnly={true}>Login</OutlinedButton>
							</View>
						</View>
					</View>
				}
				// for best performance
				androidRenderingMode="hardware"

				// for animating (allows component updates)
				// androidRenderingMode="software"
			>
				<ImageBackground
					style={styles.backgroundImage}
					source={require("../../assets/giphy1.gif")}
				>
					<View style={[styles.maskElement]}>
						<Text style={styles.title}></Text>
						<View style={styles.buttons}>
							<View style={styles.button}>
								<OutlinedButton
									onPress={changeToRegisterHandler}
									textOnly={true}
									invisible={true}
								>
									Register
								</OutlinedButton>
							</View>
							<View style={styles.button}>
								<OutlinedButton
									onPress={changeToLoginHandler}
									textOnly={true}
									invisible={true}
								>
									Login
								</OutlinedButton>
							</View>
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
	title: {
		fontSize: 50,
		fontWeight: "bold",
	},
	buttons: {
		flexDirection: "row",
		width: "70%",
		justifyContent: "space-around",
		marginTop: 24,
	},
	button: {
		width: "50%",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
	},
});
