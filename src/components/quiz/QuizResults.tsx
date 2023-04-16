import { ProgressChart } from "react-native-chart-kit";
import {
	Button,
	Card,
	H2,
	H3,
	Image,
	Paragraph,
	Separator,
	YStack,
} from "tamagui";

const chartConfig = {
	backgroundGradientFrom: "#fff",
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: "#fff",
	backgroundGradientToOpacity: 0,
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

export const QuizResults = ({ route, navigation }: any) => {
	const { score, totalQuestions } = route.params;

	const data = {
		labels: ["Score"], // optional
		data: [
			// score out of 100%
			score / totalQuestions,
		],
	};

	return (
		<YStack space maxWidth={365}>
			<Image
				w={125}
				h={125}
				source={{
					uri: "https://cdn-icons-png.flaticon.com/512/10206/10206724.png",
				}}
			/>
			<Separator />
			<H2>Quiz Complete</H2>
			<Paragraph>Here's how you did on this quiz:</Paragraph>
			<Card elevate size="$4" bordered>
				<Card.Header padded space="$3">
					<H3>Results:</H3>
					<Paragraph theme="alt2">
						You got a total of {score}/{totalQuestions} questions
						correct.
					</Paragraph>
					<ProgressChart
						data={data}
						width={325}
						height={220}
						strokeWidth={16}
						radius={73}
						chartConfig={chartConfig}
						hideLegend={false}
					/>
				</Card.Header>
			</Card>
			<Button
				bordered
				onPress={() => {
					navigation.navigate("Home");
				}}
			>
				Go Back
			</Button>
		</YStack>
	);
};
