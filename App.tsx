process.env.TAMAGUI_TARGET = "native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { AppWrapper } from "./src/routes/Stack";
import config from "./tamagui.config";

export default function App() {
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	const [onboarded, setOnboarded] = useState();

	useEffect(() => {
		const getStorage = async () => {
			const onboarded = await AsyncStorage.getItem("ONBOARDED");
			setOnboarded(JSON.parse(onboarded));
		};

		getStorage();
	}, []);

	if (!loaded) return null;

	return (
		<TamaguiProvider config={config} defaultTheme="light">
			<SafeAreaProvider>
				<NavigationContainer>
					<AppWrapper onboarded={!onboarded} />
				</NavigationContainer>
			</SafeAreaProvider>
			<StatusBar style="auto" />
		</TamaguiProvider>
	);
}
