import { useEffect, useRef, useState } from "react";
import { Button, H2, YStack, Separator } from "tamagui";

export const shuffle = (arr: any) => {
	const newArr = arr.slice();

	for (let i = newArr.length - 1; i > 0; i -= i) {
		const rand = Math.floor(Math.random() * (i + 1));

		[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
	}
	return newArr;
};

export const QuizScreen = ({ route, navigation }: any) => {
	const [questions, setQuestions] = useState<any[]>([]);

	const [index, setIndex] = useState(0);
	const score = useRef(0);

	const { studySet } = route.params;

	const setUpQuestions = () => {
		const questions = shuffle(studySet.questions);

		questions.forEach((question: any) => {
			const answers = shuffle([
				question.answer,
				...question.incorrectAnswers,
			]);

			question.answers = answers;
		});

		setQuestions(questions);
	};

	useEffect(() => {
		setUpQuestions();
	}, []);

	const handle = (answer: string) => {
		const isCorrect = answer === questions[index].answer;

		if (isCorrect) {
			score.current += 1;
		}

		if (index === questions.length - 1) {
			navigation.navigate("QuizResultScreen", {
				score: score.current,
				totalQuestions: questions.length,
			});
		} else {
			setIndex(index + 1);
		}
	};

	return (
		<YStack space="$5" ai="center">
			<H2>{questions[index]?.question}</H2>

			<Separator />
			<YStack space="$4" minWidth={300}>
				{questions[index]?.answers.map(
					(answer: string, index: number) => (
						<Button key={index} onPress={() => handle(answer)}>
							{answer}
						</Button>
					)
				)}
			</YStack>
		</YStack>
	);
};
