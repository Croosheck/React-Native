import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/Main";
import Add from "./components/main/Add";

import { statusChanged } from "./redux/reducers/slices";
import { useDispatch, useSelector } from "react-redux";

import { getAuth } from "firebase/auth";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import Save from "./components/main/Save";
import { StatusBar } from "expo-status-bar";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createStackNavigator();

function AppContainer() {
	const [isLoggedIn, setIsLoggedIn] = useState({
		loaded: false,
		loggedIn: null,
	});

	useEffect(() => {
		getAuth().onAuthStateChanged((user) => {
			if (!user) {
				setIsLoggedIn({ loaded: true, loggedIn: false });
			} else {
				setIsLoggedIn({ loaded: true, loggedIn: true });
			}
		});
	}, []);

	const { loaded, loggedIn } = isLoggedIn;

	if (!loaded) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!loggedIn) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Landing">
					<Stack.Screen
						name="Landing"
						component={Landing}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={{
							headerStyle: { backgroundColor: "#280E0E" },
							headerTintColor: "#ffffff",
							title: "",
						}}
					/>
					<Stack.Screen
						name="Login"
						component={Login}
						options={{
							headerStyle: { backgroundColor: "#280E0E" },
							headerTintColor: "#FFFFFF",
							title: "",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Main">
				<Stack.Screen
					name="Main"
					component={Main}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Add"
					component={Add}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Save"
					component={Save}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Map"
					component={Map}
					// options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PlaceDetails"
					component={PlaceDetails}
					options={{
						headerStyle: { backgroundColor: "#280E0E" },
						headerTintColor: "#FFFFFF",
						headerTitleAlign: "center",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar translucent={false} style="light" />
			<AppContainer />
		</Provider>
	);
}
