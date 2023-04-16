import {
	YStack,
	Image,
	Separator,
	H1,
	H2,
	Paragraph,
	Card,
	Button,
	XStack,
	H3,
} from "tamagui";

export const FlashcardResults = ({ route, navigation }: any) => {
	const { stats } = route.params;
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
			<H2>Study Session Complete</H2>
			<Paragraph>Here's how you did on this study session:</Paragraph>
			<Card elevate size="$4" bordered>
				<Card.Header padded space="$3">
					<H3>Correct:</H3>
					<Paragraph theme="alt2">
						You got a total of {stats.correct} correct!
					</Paragraph>
					<H3>Incorrect:</H3>
					<Paragraph theme="alt2">
						You got a total of {stats.incorrect} incorrect!{" "}
						{stats.incorrect > 0 ? "Keep trying!" : "Great job!"}
					</Paragraph>
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
