import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { useSelector, useDispatch } from "react-redux";
import { clearPlaces, loadPlaces } from "../../redux/reducers/slices";

import PlacesList from "../places/PlacesList";
import OutlinedButton from "../UI/OutlinedButton";

import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { collection, getDocs, query } from "firebase/firestore";

export default function Feed({ navigation }) {
	const [fetchedPosts, setFetchedPosts] = useState();
	const [postData, setPostData] = useState([]);
	const [screenMessage, setScreenMessage] = useState(
		"Fetch Your posts or start adding some!"
	);
	const [addScreen, setAddScreen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const addButtonScale = useSharedValue(1);
	const fetchButtonScale = useSharedValue(0);
	const fetchButtonOpacity = useSharedValue(1);

	const reanimatedAddButton = useAnimatedStyle(() => {
		return {
			transform: [{ scale: addButtonScale.value }],
		};
	});

	const reanimatedFetchButton = useAnimatedStyle(() => {
		return {
			transform: [{ scale: fetchButtonScale.value }],
			opacity: fetchButtonOpacity.value,
		};
	});

	const user = useSelector((state) => state.userReducer.currentUser);
	const loadedPlaces = useSelector((state) => state.userReducer.placesList);
	const dispatch = useDispatch();

	const postsRef = ref(storage, `posts/${auth.currentUser.uid}/images`);
	async function fetchPostsRawData() {
		const response = await listAll(postsRef);
		const list = response.items;
		setFetchedPosts(list);

		const q = query(collection(db, "posts", auth.currentUser.uid, "userPosts"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setPostData((current) => [...current, doc.data()]);
		});
	}

	useEffect(() => {
		fetchPostsRawData();
		setScreenMessage("Loading...");
		if (postData) {
			setTimeout(() => {
				fetchButtonOpacity.value = withTiming(
					0,
					{ duration: 10 },
					(finished) => {
						if (finished)
							fetchButtonOpacity.value = withTiming(1, { duration: 1200 });
					}
				);
				fetchButtonScale.value = withSpring(1, { mass: 1 });
				setScreenMessage("Fetch Your posts or start adding some!");
			}, 1500);
		}
	}, []);

	async function fetchListHandler() {
		// Prevents from writing the state over and over with the same data
		// (by clicking the fetch button quickly)
		if (isDisabled) return;
		const freezeTimer = setTimeout(() => {
			setIsDisabled(false);
			clearTimeout(freezeTimer);
		}, 3000);
		setIsDisabled(true);

		// Bumping press animation
		fetchButtonScale.value = withSpring(0.85, { mass: 0.7 }, (finished) => {
			if (finished) {
				fetchButtonScale.value = withSpring(1, { mass: 0.7 });
			}
		});

		// Fetch raw data from Firebase Storage (images for posts)
		fetchPostsRawData();

		// Preview into a data container (for code management purposes)
		// if (postData.length !== 0) {
		// 	console.log(postData[0]);
		// }

		fetchedPosts.forEach(async (item, i) => {
			if (addScreen === true) {
				setAddScreen(false);
			}

			// .name, .fullPath - optional data for an "item"
			const postPicRef = ref(storage, item.fullPath);

			// Downloads an image on postPicRef's path
			const fetchedPostImage = await getDownloadURL(postPicRef);

			// Gets the filename of an image fetched
			const { name: filename } = await getMetadata(postPicRef);

			// Matches the data from Firestore (title, address, location) with the image with exact filename
			// postItem.filename is the same as an image metadata name (filename)
			const postItem = postData.find((post) => post.filename === filename);

			// Generates posts as a state, from the data fetched above
			dispatch(
				loadPlaces({
					// Model required for PlaceItem.js file
					title: postItem ? postItem.title : "none",
					description: postItem ? postItem.description : "none",
					imageUri: fetchedPostImage ? fetchedPostImage : null,
					address: postItem ? postItem.address : "none",
					location: postItem ? postItem.coords : "none",
					id: filename,
					timestamp: postItem.timestamp,
				})
			);
		});

		if (loadedPlaces.length > 0) {
			setScreenMessage("Loading...");
			setAddScreen(false);
			dispatch(clearPlaces());
			setPostData([]);
		}

		if (fetchedPosts.length === 0) {
			setScreenMessage("No posts yet :(\nAdd some!");
			// Prevents nesting animations
			addButtonScale.value = 1;
			addButtonScale.value = withRepeat(withSpring(1.1), null, true);
			setAddScreen(true);
		}
	}

	function addScreenHandler() {
		navigation.navigate("Add");
	}

	return (
		<View style={styles.container}>
			{user && (
				<View style={[styles.listContainer, addScreen && styles.addScreen]}>
					<PlacesList places={loadedPlaces} screenMessage={screenMessage} />
					{addScreen && (
						<Animated.View style={reanimatedAddButton}>
							<OutlinedButton
								icon="add-circle-outline"
								size={26}
								onPress={addScreenHandler}
								highlighted={true}
								style={styles.addButton}
							>
								Add
							</OutlinedButton>
						</Animated.View>
					)}
				</View>
			)}
			{user && (
				<Animated.View style={[styles.buttonContainer, reanimatedFetchButton]}>
					<OutlinedButton onPress={fetchListHandler}>
						Update Posts List
					</OutlinedButton>
				</Animated.View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#220E0E",
	},
	listContainer: {
		flex: 1,
		justifyContent: "center",
	},
	addScreen: {
		justifyContent: "center",
		alignItems: "center",
	},
	addButton: {
		marginTop: 24,
	},
	buttonContainer: {
		marginBottom: 4,
		marginHorizontal: 16,
	},
});
