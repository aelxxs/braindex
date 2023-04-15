import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TamaguiProvider, Button } from "tamagui";
import config from "./tamagui.config";
import { FlashCardScreen } from './src/components/flashcard/Flashcard';
export default function App() {
	return (
		<TamaguiProvider config={config}>
			<View style={styles.container}>
					<FlashCardScreen/>
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
