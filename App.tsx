import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Button, TamaguiProvider } from "tamagui";

import config from "./tamagui.config";

export default function App() {
	return (
		<TamaguiProvider config={config}>
			<View style={styles.container}>
				<Button></Button>
				<Text>Alexis^2 is cooler than suhaan</Text>
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
