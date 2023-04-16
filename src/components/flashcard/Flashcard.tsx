import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Button, H2, Paragraph, Spacer, Stack, XStack, YStack } from "tamagui";

const shuffle = (array: any) => {
	let currentIndex = array.length,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

export const FlashCardScreen = ({ route, navigation }: any) => {
	const [deck, setDeck] = useState<any>([]);
	const [card, setCard] = useState<any>([]);
	const [animatedValue] = useState(new Animated.Value(0));
	const [isFlipped, setIsFlipped] = useState(false);
	const [stats, setStats] = useState({
		correct: 0,
		incorrect: 0,
		total: 0,
	});

	const createDeck = () => {
		const questions = shuffle(route.params.studySet.questions);

		const deck = questions.map((question: any) => {
			return [question.question, question.answer];
		});

		setCard(deck[0]);
		setDeck(deck);
		setStats({
			...stats,
			total: deck.length,
		});
	};

	useEffect(() => {
		createDeck();
	}, []);

	const flipCard = () => {
		setIsFlipped(!isFlipped);
		Animated.spring(animatedValue, {
			toValue: isFlipped ? 0 : 1,
			friction: 8,
			tension: 10,
			useNativeDriver: true,
		}).start();
	};

	const handleNext = (correct: boolean) => {
		if (deck.indexOf(card) === deck.length - 1) {
			return navigation.navigate("FlashcardResults", {
				stats: {
					...stats,
					correct: correct ? stats.correct + 1 : stats.correct,
					incorrect: correct ? stats.incorrect : stats.incorrect + 1,
				},
			});
		}

		if (correct) {
			setStats({
				...stats,
				correct: stats.correct + 1,
			});
		} else {
			setStats({
				...stats,
				incorrect: stats.incorrect + 1,
			});
		}

		flipCard();

		setTimeout(() => {
			setCard(deck[deck.indexOf(card) + 1]);
		}, 150);
	};

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["180deg", "360deg"],
	});

	return (
		<YStack space="$4" ai="center">
			<XStack alignSelf="flex-end">
				<Paragraph>
					{deck.indexOf(card) + 1}/{deck.length}
				</Paragraph>
			</XStack>
			<Stack onPress={flipCard} mb="$8">
				<Animated.View
					style={[
						styles.card,
						{ transform: [{ rotateY: frontInterpolate }] },
					]}
				>
					<H2>{card[0]}</H2>
				</Animated.View>
				<Animated.View
					style={[
						styles.card,
						styles.back,
						{ transform: [{ rotateY: backInterpolate }] },
					]}
				>
					<H2>{card[1]}</H2>
				</Animated.View>
			</Stack>

			<XStack opacity={isFlipped ? 1 : 0} space="$4">
				<Button bc="$green5" onPress={() => handleNext(true)}>
					Correct
				</Button>
				<Button bc="$red5" onPress={() => handleNext(false)}>
					Incorrect
				</Button>
			</XStack>
		</YStack>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 325,
		height: 450,
		borderRadius: 10,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		backfaceVisibility: "hidden",
		padding: 25,
	},
	back: {
		position: "absolute",
	},
});
