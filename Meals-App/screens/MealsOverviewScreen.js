import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";

function MealsOverviewScreen({ route }) {
	const { categoryId: catId } = route.params;

	const displayedMeals = MEALS.filter(
		(meal) => meal.categoryIds.indexOf(catId) >= 0
	);

	return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
