import { ArrowLeft, ArrowRight } from "@tamagui/lucide-icons";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import studySets from "../../api/studyset";
import {
	Card,
	Button,
	YStack,
	XStack,
	Text,
	AnimatePresence,
	styled,
} from "tamagui";

const YStackEnterable = styled(YStack, {
	variants: {
		isLeft: { true: { x: -300, opacity: 0 } },
		isRight: { true: { x: 300, opacity: 0 } },
	} as const,
});

const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const images = studySets.map((x) => x.questions || x)

console.log(images);
const FlashCard = (studySets: any) => {
	const [[page, direction], setPage] = React.useState([0, 0]);
	const [showAnswer, setShowAnswer] = React.useState(true);
	const enterVariant =
		direction === 1 || direction === 0 ? "isRight" : "isLeft";
	const exitVariant = direction === 1 ? "isLeft" : "isRight";
	const imageIndex = wrap(0, studySets.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};
	return (
		<Card
			size="$5"
			w={400}
			h={300}
			elevate
			onPress={() => {
				setShowAnswer(!showAnswer);
			}}
		>
			<XStack flex={1} space="$2" borderRadius="$4" alignItems="center">
				<AnimatePresence
					enterVariant={enterVariant}
					exitVariant={exitVariant}
				>
					<YStackEnterable
						key={page}
						animation="bouncy"
						fullscreen
						x={0}
						opacity={1}
					>
						<YStack alignItems="center">
							<XStack alignItems="center">
								{showAnswer ? (
									<Text>Hello</Text>
								) : (
									<Text>Goodbye</Text>
								)}
							</XStack>
						</YStack>
					</YStackEnterable>
				</AnimatePresence>
				<XStack flex={1} alignContent="space-between">
					<YStack>
						<Button
							accessibilityLabel="Carousel left"
							size="$5"
							circular
							elevate
							onPress={() => {
								paginate(-1);
								setShowAnswer(true);
							}}
						>
							Prev
						</Button>
					</YStack>
					<YStack>
						<Button
							accessibilityLabel="Carousel right"
							size="$5"
							circular
							elevate
							onPress={() => {
								setShowAnswer(true);
								paginate(1);
							}}
						>
							Next
						</Button>
					</YStack>
				</XStack>
			</XStack>
		</Card>
	);
};

export const FlashCardScreen = () => {
	return (
		<XStack>
			<FlashCard elevate studySets={images} />
		</XStack>
	);
};
