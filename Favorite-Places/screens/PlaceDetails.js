import { useEffect, useState } from "react";
import {
	Button,
	Dimensions,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
// import { fetchPlaceDetails } from "../util/database";
import Map from "./Map";

import { useSelector } from "react-redux";

const PlaceDetails = ({ route, navigation }) => {
	const [fetchedPlace, setFetchedPlace] = useState();

	const loadedPlaces = useSelector((state) => state.userReducer.placesList);

	const selectedPlaceId = route.params.placeId;

	useEffect(() => {
		async function loadPlaceData() {
			const place = await loadedPlaces.find(
				(place) => place.id === selectedPlaceId
			);
			setFetchedPlace(place);

			navigation.setOptions({
				title: place.title,
			});
		}

		loadPlaceData();
	}, []);

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place data...</Text>
			</View>
		);
	}

	function showOnMapHandler() {
		navigation.navigate("Map", {
			lat: fetchedPlace.location.lat,
			lng: fetchedPlace.location.lng,
			onlyViewMode: true,
		});
	}

	// Shows on Google Maps
	function mapsRedirectHandler() {
		const scheme = Platform.select({
			ios: "maps:0,0?q=",
			android: "geo:0,0?q=",
		});
		const latLng = `${fetchedPlace.location.lat},${fetchedPlace.location.lng}`;
		const label = fetchedPlace.title;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`,
		});

		Linking.openURL(url);
	}

	// // Navigates on Google Maps
	// function mapsRedirectHandler() {
	// 	Linking.openURL(
	// 		`google.navigation:q=${fetchedPlace.location.lat}+${fetchedPlace.location.lng}`
	// 	);
	// }

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollViewAlign}
		>
			<View style={styles.dataContainer}>
				<Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{fetchedPlace.address}</Text>
				</View>
				<View style={styles.descriptionContainer}>
					<Text style={styles.description}>{fetchedPlace.description}</Text>
				</View>
			</View>
			<View style={styles.locationContainer}>
				<View style={styles.buttonsContainer}>
					<OutlinedButton
						icon="map"
						onPress={showOnMapHandler}
						style={styles.button}
					>
						View on Map
					</OutlinedButton>
					<OutlinedButton
						icon="navigate-outline"
						onPress={mapsRedirectHandler}
						style={styles.button}
					>
						Navigate
					</OutlinedButton>
				</View>
			</View>
		</ScrollView>
	);
};

export default PlaceDetails;

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#220E0E",
	},
	container: {
		backgroundColor: "#220E0E",
	},
	scrollViewAlign: {
		flex: 1,
	},
	dataContainer: {
		flex: 0.8,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	image: {
		width: Dimensions.get("window").width * 0.8,
		height: Dimensions.get("window").width * 0.8,
		marginTop: 16,
		marginBottom: 4,
		borderWidth: 2,
		borderColor: "#cccccc",
	},
	locationContainer: {
		flex: 0.2,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	button: {
		width: Dimensions.get("window").width * 0.4,
	},
	addressContainer: {
		marginTop: 8,
		marginHorizontal: 12,
	},
	address: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
	descriptionContainer: {
		marginBottom: 10,
	},
	description: {
		color: "#ffffff",
		textAlign: "center",
		fontSize: 14,
		marginTop: 8,
	},
});
