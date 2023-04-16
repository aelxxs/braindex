import { Card, H2, H3, Image, Paragraph, Stack, XStack, YStack } from "tamagui";

export const ViewScreen = ({ route, navigation }: any) => {
	const studySet = route.params.studySet;

	return (
		<Stack flex={1}>
			<Stack flex={1} bc="$red11"></Stack>
			<YStack flex={3} pos="relative" px="$4">
				<Image
					pos="absolute"
					top={-60}
					left={15}
					br={20}
					w={125}
					h={125}
					source={{
						uri: studySet.icon ?? "https://picsum.photos/200",
					}}
				/>

				<YStack mt="$12" space="$6">
					<YStack>
						<H2>{studySet.name}</H2>
						<Paragraph theme="alt2">
							{studySet.description}
						</Paragraph>
					</YStack>
					<Card
						size="$6"
						bordered
						onPress={() => {
							navigation.navigate("Flashcards", { studySet });
						}}
					>
						<Card.Header padded>
							<XStack ai="center" space="$3">
								<YStack>
									<H3>Flashcards</H3>
									<Paragraph>
										Test your knowledge with{" "}
										{studySet.questions.length} flashcards
										about {studySet.name}.
									</Paragraph>
								</YStack>
							</XStack>
						</Card.Header>
					</Card>

					<Card
						size="$6"
						bordered
						onPress={() => {
							navigation.navigate("Quiz", { studySet });
						}}
					>
						<Card.Header padded>
							<H3>Quiz</H3>
							<Paragraph>
								Feeling confident? Take a quiz with to test your
								knowledge of {studySet.name}.
							</Paragraph>
						</Card.Header>
					</Card>
				</YStack>
			</YStack>
		</Stack>
	);
};
