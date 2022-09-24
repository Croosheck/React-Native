import { FlatList, StyleSheet, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoriesScreen({ navigation }) {
	//
	function renderCategoryItem(itemData) {
		function pressHandler() {
			navigation.navigate("MealsOverview", {
				categoryId: itemData.item.id,
				categoryTitle: itemData.item.title,
			});
		}
		return (
			<CategoryGridTile
				onPress={pressHandler}
				title={itemData.item.title}
				color={itemData.item.color}
				id={itemData.item.id}
				img={itemData.item.img}
			/>
		);
	}

	return (
		<View style={styles.categoriesContainer}>
			<FlatList
				data={CATEGORIES}
				keyExtractor={(item) => item.id}
				renderItem={renderCategoryItem}
				numColumns={2}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	categoriesContainer: {
		flex: 1,
	},
	category: {
		width: "40%",
		height: "40%",
		borderWidth: 2,
		elevation: 8,
	},
});

export default CategoriesScreen;
