import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import Colors from "./constants/colors";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/context/expenses-context";

const { headerBackground, tint } = Colors.header;
const { tabBarBackGround, activeTab, inactiveTab } = Colors.tabBar;

export default function App() {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

	function ExpensesOverview() {
		return (
			<Tab.Navigator
				screenOptions={({ navigation }) => ({
					headerStyle: { backgroundColor: headerBackground },
					headerTintColor: tint,
					tabBarStyle: { backgroundColor: tabBarBackGround },
					tabBarActiveTintColor: activeTab,
					tabBarInactiveTintColor: inactiveTab,
					headerTitleAlign: "center",
					headerRight: ({ tintColor }) => (
						<IconButton
							name="plus"
							color={tintColor}
							size={24}
							onPress={() =>
								navigation.navigate("ManageExpense", {
									add: "Add expense",
								})
							}
						/>
					),
				})}
			>
				<Tab.Screen
					name="RecentExpenses"
					component={RecentExpenses}
					options={{
						title: "Recent Expenses",
						tabBarLabel: "Recent",
						tabBarIcon: ({ color, size }) => (
							<Icon name="history" size={size} style={{ color: color }} />
						),
					}}
				/>
				<Tab.Screen
					name="AllExpenses"
					component={AllExpenses}
					options={{
						title: "All Expenses",
						tabBarLabel: "All",
						tabBarIcon: ({ color, size }) => (
							<Icon name="coins" size={size} style={{ color: color }} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	}

	return (
		<>
			<ExpoStatusBar style="light" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: headerBackground },
							headerTintColor: tint,
							headerTitleAlign: "center",
						}}
					>
						<Stack.Screen
							name="ExpensesOverview"
							component={ExpensesOverview}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpense}
							options={({ route }) => {
								const { add, edit } = route.params;
								return {
									presentation: "modal",
									title: add || edit,
								};
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
