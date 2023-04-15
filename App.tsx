import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TamaguiProvider, Button } from "tamagui";
import config from "./tamagui.config";

export default function App() {
	return (
		<TamaguiProvider config={config}>
			<View style={styles.container}>
				<Button>
					<Text>Hello</Text>
				</Button>
				<StatusBar style="auto" />
			</View>
		</TamaguiProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
