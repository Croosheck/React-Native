import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../redux/reducers/slices";

import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Feed from "./main/Feed";
import Profile from "./main/Profile";

const EmptyScreen = () => {
	return null;
};

export default function Main() {
	const Tab = createMaterialBottomTabNavigator();

	const dispatch = useDispatch();
	const [userData, setUserData] = useState({ email: "", name: "" });

	const user = useSelector((state) => state.userReducer.currentUser);

	useEffect(() => {
		dispatch(getUser());
		return () => {};
	}, []);

	function getUsersDataHandler() {
		if (!user) return;
		setUserData(user);
	}

	function logoutHandler() {
		signOut(auth);
		dispatch(logoutUser());
	}

	return (
		// <View style={styles.container}>
		// 	<Text>Email: {userData.email}</Text>
		// 	<Text>Name: {userData.name}</Text>
		// 	<View style={styles.buttons}>
		// 		{user && (
		// 			<View style={styles.button}>
		// 				<Button title="Get user's data" onPress={getUsersDataHandler} />
		// 			</View>
		// 		)}
		// 		<View style={styles.button}>
		// 			<Button title="Logout" onPress={logoutHandler} />
		// 		</View>
		// 	</View>
		// 	{user && <Text>{user.name} logged in.</Text>}
		// </View>
		<Tab.Navigator barStyle={{ backgroundColor: "#26252B" }} labeled={false}>
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: ({ color }) => {
						return (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						);
					},
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="AddContainer"
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color }) => {
						return (
							<MaterialCommunityIcons name="plus" color={color} size={26} />
						);
					},
					ttabBarShowLabel: false,
				}}
				listeners={({ navigation }) => ({
					tabPress: (event) => {
						event.preventDefault();
						navigation.navigate("Add");
					},
				})}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => {
						return <Ionicons name="person" color={color} size={26} />;
					},
					tabBarShowLabel: false,
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	buttons: {
		flexDirection: "row",
		width: "80%",
	},
	button: {
		flex: 1,
		marginHorizontal: 4,
	},
});
