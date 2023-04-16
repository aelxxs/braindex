import {
	NativeStackNavigationOptions,
	createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { HomeScreen } from "../components/home/Home";
import { ViewScreen } from "../components/view/View";

import { FlashCardScreen } from "../components/flashcard/Flashcard";
import { FlashcardResults } from "../components/flashcard/Results";
import { OnboardScreen } from "../components/onboard/Onboard";
import { QuizScreen } from "../components/quiz/Quiz";
import { QuizResults } from "../components/quiz/QuizResults";

type Props = {
	onboarded: boolean;
};

export const AppWrapper = ({ onboarded }: Props) => {
	const Stack = createNativeStackNavigator();

	const navigationOptions: NativeStackNavigationOptions = {
		headerShown: true,
		headerShadowVisible: false,
		animationTypeForReplace: "push",
		animation: "slide_from_right",
		presentation: "card",
	};

	return (
		<Stack.Navigator
			initialRouteName={onboarded ? "Home" : "Onboard"}
			screenOptions={navigationOptions}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					title: "Welcome",
					contentStyle: { paddingTop: 35 },
				}}
			/>
			<Stack.Screen
				name="View"
				component={ViewScreen}
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="Flashcards"
				component={FlashCardScreen}
				options={{
					title: "",
					contentStyle: {
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				}}
			/>
			<Stack.Screen
				name="Quiz"
				component={QuizScreen}
				options={{
					title: "Quiz",
					contentStyle: {
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				}}
			/>
			<Stack.Screen
				name="FlashcardResults"
				component={FlashcardResults}
				options={{
					headerShown: false,
					title: "Results",
					contentStyle: {
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				}}
			/>
			<Stack.Screen
				name="QuizResultScreen"
				component={QuizResults}
				options={{
					headerShown: false,

					title: "Results",
					contentStyle: {
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				}}
			/>
			<Stack.Screen
				name="Onboard"
				component={OnboardScreen}
				options={{
					headerShown: false,
					title: "Onboard",
					contentStyle: {
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					},
				}}
			/>
		</Stack.Navigator>
	);
};
