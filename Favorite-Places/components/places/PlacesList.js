import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places, screenMessage }) => {
	const navigation = useNavigation();

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>{screenMessage}</Text>
			</View>
		);
	}

	function selectPlaceHandler(id) {
		navigation.navigate("PlaceDetails", {
			placeId: id,
		});
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
		/>
	);
};

export default PlacesList;

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 16,
		marginVertical: 8,
	},
	fallbackContainer: {
		// flex: 1,
		// justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: "#98CCFF",
		textAlign: "center",
	},
});
