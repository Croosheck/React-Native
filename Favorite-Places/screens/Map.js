import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export default function Map({ route, navigation }) {
	const { lat: locationLat, lng: locationLng, onlyViewMode } = route.params;
	const [selectedLatLng, setSelectedLatLng] = useState({
		latitude: locationLat,
		longitude: locationLng,
	});

	const region = {
		// latitude: 37.4216863,
		// longitude: -122.0842771,
		latitude: locationLat,
		longitude: locationLng,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(event) {
		if (onlyViewMode) return;

		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;

		setSelectedLatLng({ latitude: lat, longitude: lng });
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLatLng) {
			Alert.alert(
				"No location picked!",
				"You have to pick a location (by tapping on the map) first!"
			);
			return;
		}

		navigation.navigate("Add", {
			pickedLat: selectedLatLng.latitude,
			pickedLng: selectedLatLng.longitude,
		});
	}, [navigation, selectedLatLng]);

	useLayoutEffect(() => {
		if (onlyViewMode) return;

		navigation.setOptions({
			headerRight: () => (
				<IconButton
					icon="checkmark"
					size={28}
					onPress={savePickedLocationHandler}
				/>
			),
		});
	}, [navigation, savePickedLocationHandler]);

	return (
		<MapView
			initialRegion={region}
			style={styles.map}
			onPress={selectLocationHandler}
		>
			<Marker coordinate={selectedLatLng} />
		</MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
