import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";

function FavoritesScreen() {
	const favoriteMealsCtx = useContext(FavoritesContext);
	const [...ids] = favoriteMealsCtx.ids;
	const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));
	if (favoriteMeals.length > 0) {
		return <MealsList items={favoriteMeals} />;
	} else {
		return (
			<View style={styles.root}>
				<Text style={styles.text}>
					Seems like You are still looking for some SPECIAL meals... 🔍
				</Text>
			</View>
		);
	}
}

export default FavoritesScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	},
	text: {
		color: "#ffffff",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
	},
});
