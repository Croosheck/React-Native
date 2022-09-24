import { useContext, useLayoutEffect } from "react";
import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailsScreen({ route, navigation }) {
	const favoriteMealsCtx = useContext(FavoritesContext);
	const { mealName, mealId } = route.params;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);
	const {
		duration,
		complexity,
		affordability,
		imageUrl,
		ingredients,
		steps,
		isFavorite,
	} = selectedMeal;

	const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			favoriteMealsCtx.removeFavorite(mealId);
			// console.log(favoriteMealsCtx.ids);
		}
		if (!mealIsFavorite) {
			favoriteMealsCtx.addFavorite(mealId);
			// console.log(favoriteMealsCtx.ids);
		}
	}

	// Adding an icon to the header
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						onPress={changeFavoriteStatusHandler}
						icon="heart"
						isActive={mealIsFavorite}
					/>
				);
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<View style={styles.rootContainer}>
			<LinearGradient
				colors={["#FFFFFF", "#100D0DA4"]}
				style={styles.imageContainer}
			>
				<ImageBackground
					source={{ uri: imageUrl }}
					resizeMode="cover"
					style={styles.image}
					imageStyle={styles.image}
				>
					<LinearGradient
						style={styles.titleInnerContainer}
						colors={["#FFFEFE51", "#000000A3"]}
					>
						<Text style={styles.title}>{mealName}</Text>
					</LinearGradient>
				</ImageBackground>
				<View style={styles.details}>
					<Text style={styles.detailItem}>⌚ {duration}m</Text>
					<Text style={styles.detailItem}>🧩 {complexity.toUpperCase()}</Text>
					<Text style={styles.detailItem}>
						💲 {affordability.toUpperCase()}
					</Text>
				</View>
			</LinearGradient>
			<View style={styles.lists}>
				<LinearGradient
					colors={["#369DD0", "transparent", "#530F8A"]}
					style={styles.listIngredients}
				>
					<Text style={styles.listTitle}>Ingredients</Text>
					<FlatList
						data={ingredients}
						keyExtractor={(index) => {
							return "i" + index;
						}}
						renderItem={(itemData) => {
							return <Text style={styles.listItem}>{itemData.item}</Text>;
						}}
					/>
				</LinearGradient>
				<LinearGradient
					colors={["#369DD0", "transparent", "#530F8A"]}
					style={styles.listSteps}
				>
					<Text style={styles.listTitle}>Steps</Text>
					<FlatList
						data={steps}
						keyExtractor={(index) => {
							return "s" + index;
						}}
						renderItem={(itemData) => {
							return (
								<Text style={styles.listItem}>
									{itemData.index + 1}. {itemData.item}
								</Text>
							);
						}}
					/>
				</LinearGradient>
			</View>
		</View>
	);
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
		width: "98%",
		borderRadius: 4,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		marginVertical: 4,
	},
	image: {
		flex: 1,
		margin: 1,
		borderRadius: 4,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		// justifyContent: "center",
	},
	titleInnerContainer: {
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		flexDirection: "row",
		padding: 2,
		marginHorizontal: 1,
	},
	title: {
		flex: 1,
		color: "#FFFFFF",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		fontStyle: "italic",
		fontVariant: ["small-caps"],
	},
	details: {
		flexDirection: "row",
		// alignItems: "center",
		justifyContent: "center",
		marginVertical: 2,
		// borderWidth: 3,
	},
	detailItem: {
		color: "#FFFFFF",
		textAlign: "center",
		fontWeight: "bold",
		marginHorizontal: 16,
		// borderWidth: 3,
	},
	lists: {
		flex: 1.2,
		flexDirection: "column",
		width: "99%",
	},
	listTitle: {
		fontSize: 16,
		color: "#390D5B",
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 4,
	},
	listIngredients: {
		flex: 1,
		marginVertical: 8,
		marginHorizontal: 4,
		borderWidth: 2,
		borderColor: "#cccccc",
		borderRadius: 8,
		paddingHorizontal: 4,
		paddingVertical: 2,
	},
	listSteps: {
		flex: 1,
		marginVertical: 8,
		marginHorizontal: 4,
		borderWidth: 2,
		borderColor: "#cccccc",
		borderRadius: 8,
		paddingHorizontal: 4,
		paddingVertical: 2,
	},
	listItem: {
		color: "white",
		marginVertical: 2,
		marginHorizontal: 4,
		borderBottomWidth: 0.3,
		borderBottomColor: "white",
	},
});
