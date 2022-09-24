import Constants from "expo-constants";

const GOOGLE_API_KEY = Constants.manifest.extra.googleApiKey;

export function getMapPreview(lat, lng) {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=1800x900&maptype=roadmap
  &markers=color:red%7Clabel:%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`;
	return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch address!");
	}

	const data = await response.json();
	address = data.results[0].formatted_address;
	return address;
}
