import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import Icon from "react-native-vector-icons/AntDesign";
import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: {
					backgroundColor: "#3C1D27",
				},
				headerTintColor: "#ffffff",
				sceneContainerStyle: { backgroundColor: "#0D1738" },
				drawerActiveBackgroundColor: "#BEC2FC",
				drawerActiveTintColor: "#400A40",
				drawerInactiveTintColor: "#767575",
				drawerStyle: { backgroundColor: "#0D1738" },
				drawerType: "slide",
				swipeEdgeWidth: 500,
			}}
		>
			<Drawer.Screen
				name="Categories"
				component={CategoriesScreen}
				options={{
					drawerAllowFontScaling: true,
					drawerLabel: "All Categories",
					drawerIcon: ({ color, size }) => {
						return <Icon name="home" size={size} color={color} />;
					},
					drawerLabelStyle: { fontWeight: "bold" },
					title: "All Categories",
				}}
			/>
			<Drawer.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					drawerIcon: ({ color, size }) => {
						return <Icon name="hearto" size={size} color={color} />;
					},
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<FavoritesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTitleAlign: "center",
							headerStyle: {
								backgroundColor: "#3C1D27",
							},
							headerTintColor: "white",
							contentStyle: { backgroundColor: "#0D1738" },
							animation: "slide_from_right",
						}}
					>
						<Stack.Screen
							options={{
								headerShown: false,
							}}
							name="Drawer"
							component={DrawerNavigator}
						/>
						<Stack.Screen
							options={({ route }) => {
								const { categoryTitle } = route.params;
								return {
									title: categoryTitle,
									headerStyle: {
										backgroundColor: "#351401",
									},
									contentStyle: { backgroundColor: "#3f2f25" },
								};
							}}
							name="MealsOverview"
							component={MealsOverviewScreen}
						/>
						<Stack.Screen
							options={({ route }) => {
								// const { mealName } = route.params;
								return {
									// title: mealName,
									title: "Meal Detail",
									headerTitleStyle: {
										fontSize: 16,
										fontWeight: "bold",
										color: "#D1D5FF",
									},
								};
							}}
							name="MealDetails"
							component={MealDetailsScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</FavoritesContextProvider>
		</>
	);
}

const styles = StyleSheet.create({});
