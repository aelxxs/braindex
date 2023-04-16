import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import {
	Avatar,
	Button,
	Card,
	Form,
	H2,
	H3,
	Image,
	Label,
	Paragraph,
	ScrollView,
	Sheet,
	Spinner,
	Stack,
	XStack,
	YStack,
} from "tamagui";

import * as DocumentPicker from "expo-document-picker";
import { Input } from "tamagui";
import { cognitoPool } from "../onboard/Onboard";
import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

const studySetsData = [
	{
		id: 1,
		name: "Math 127: Unit 10.1",
		description: "Math study set",
		dateCreated: "2021-08-01",
		subject: "Math",
		icon: "https://cdn-icons-png.flaticon.com/512/2861/2861731.png",
		questions: [
			{
				id: 1,
				question: "What is 1 + 1?",
				answer: "2",
				incorrectAnswers: ["1", "3", "4"],
			},
			{
				id: 2,
				question: "What is 2 + 2?",
				answer: "4",
				incorrectAnswers: ["1", "3", "5"],
			},
			{
				id: 3,
				question: "What is 3 + 3?",
				answer: "6",
				incorrectAnswers: ["1", "3", "4"],
			},
			{
				id: 4,
				question: "What is 4 + 4?",
				answer: "8",
				incorrectAnswers: ["1", "3", "4"],
			},
		],
	},
	{
		id: 2,
		name: "Geography",
		description: "Geography study set",
		subject: "Geography",
		icon: "https://cdn-icons-png.flaticon.com/512/290/290336.png",
		questions: [
			{
				id: 1,
				question: "What is the capital of the United States?",
				answer: "Washington D.C.",
				incorrectAnswers: ["New York", "Los Angeles", "Chicago"],
			},
			{
				id: 2,
				question: "What is the capital of Canada?",
				answer: "Ottawa",
				incorrectAnswers: ["Toronto", "Vancouver", "Montreal"],
			},
			{
				id: 3,
				question: "What is the capital of Mexico?",
				answer: "Mexico City",
				incorrectAnswers: ["Guadalajara", "Monterrey", "Tijuana"],
			},
			{
				id: 4,
				question: "What is the capital of Brazil?",
				answer: "Brasilia",
				incorrectAnswers: ["Rio de Janeiro", "Sao Paulo", "Salvador"],
			},
		],
	},

	{
		id: 3,
		name: "History",
		description: "History study set",
		subject: "History",
		icon: "https://cdn-icons-png.flaticon.com/512/2234/2234770.png",
		questions: [
			{
				id: 1,
				question: "Who was the first president of the United States?",
				answer: "George Washington",
				incorrectAnswers: [
					"Thomas Jefferson",
					"Abraham Lincoln",
					"John Adams",
				],
			},
			{
				id: 2,
				question: "Who was the first president of Canada?",
				answer: "John A. Macdonald",
				incorrectAnswers: [
					"William Lyon Mackenzie King",
					"Sir Wilfrid Laurier",
					"Sir John A. Macdonald",
				],
			},
			{
				id: 3,
				question: "Who was the first president of Mexico?",
				answer: "Guadalupe Victoria",
				incorrectAnswers: [
					"Benito Juarez",
					"Emiliano Zapata",
					"Francisco I. Madero",
				],
			},
			{
				id: 4,
				question: "Who was the first president of Brazil?",
				answer: "Pedro I",
				incorrectAnswers: [
					"Getulio Vargas",
					"Juscelino Kubitschek",
					"Juscelino Kubitschek",
				],
			},
		],
	},
	{
		id: 4,
		name: "Chemistry",
		description: "Chemistry study set",
		subject: "Chemistry",
		icon: "https://cdn-icons-png.flaticon.com/512/1233/1233846.png",
		questions: [
			{
				id: 1,
				question: "What is the chemical formula for water?",
				answer: "H2O",
				incorrectAnswers: ["H2O2", "H2O3", "H2O4"],
			},
			{
				id: 2,
				question: "What is the chemical formula for carbon dioxide?",
				answer: "CO2",
				incorrectAnswers: ["CO3", "CO4", "CO5"],
			},
			{
				id: 3,
				question: "What is the chemical formula for oxygen?",
				answer: "O2",
				incorrectAnswers: ["O3", "O4", "O5"],
			},
			{
				id: 4,
				question: "What is the chemical formula for hydrogen?",
				answer: "H2",
				incorrectAnswers: ["H3", "H4", "H5"],
			},
		],
	},
];
const StudySetPreview = ({ studySet, navigation }: any) => {
	const handlePress = () => {
		return navigation.navigate("View", { studySet });
	};

	return (
		<Stack
			enterStyle={{
				x: 150,
				opacity: 0,
				scale: 0.85,
			}}
			pos="relative"
		>
			<Card
				br="$8"
				pos="relative"
				elevate
				size="$5"
				bordered
				onPress={handlePress}
			>
				<Card.Header padded>
					<XStack ai="center" space="$3">
						<Image
							br="$3"
							width={75}
							height={75}
							source={{
								uri:
									studySet.icon ??
									"https://picsum.photos/200",
							}}
						/>
						<YStack>
							<H3>{studySet.name}</H3>
							<Paragraph theme="alt2">
								{studySet.description}
							</Paragraph>
						</YStack>
					</XStack>
				</Card.Header>
			</Card>
		</Stack>
	);
};

const CreateNewStudySet = (props: any) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [subject, setSubject] = useState("");
	const [icon, setIcon] = useState("");
	const [file, setFile] = useState<any>();
	const [status, setStatus] = useState<boolean>(false);

	const handleDocumentUpload = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "application/pdf",
		});

		if (result.type === "cancel") {
			return;
		}

		if (result.type === "success") {
			setFile(result);
		}
	};

	const handleSubmit = async () => {
		const access = new Credentials({
			accessKeyId: "AKIA3NEADT7AV4DZWZR4",
			secretAccessKey: "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",
		});

		const s3 = new S3({
			credentials: access,
			region: "us-east-1",
			signatureVersion: "v4",
		});

		const url = await s3.getSignedUrlPromise("putObject", {
			Bucket: "hackku-textract-bucket",
			Key: `${file.name}`,
			ContentType: "application/pdf",
			Expires: 60 * 15,
		});

		const fetchResourceFromURI = async (uri) => {
			const response = await fetch(uri);
			const blob = await response.blob();
			return blob;
		};

		const data = await fetchResourceFromURI(file.uri);

		await fetch(url, { method: "PUT", body: data });

		setTimeout(async () => {
			const stuff = await fetch(
				"https://asvbsxgk3m.execute-api.us-east-1.amazonaws.com/Test/textract",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"eyJraWQiOiJsdW1JS0d5aGw1ajYzeFVOYXNkdGdXcTN0U1lxWjFOcE1WTUhqakxIWUZFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMWFmNmYyYi05MDI5LTRkNzQtYWQ3Zi1hMWM5NGRhYTRmYzciLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjgxNTk4NTU1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9WUm9OcW5RZnYiLCJleHAiOjE2ODE2MDIxNTUsImlhdCI6MTY4MTU5ODU1NSwidmVyc2lvbiI6MiwianRpIjoiYTQ4YzRmYmEtYTEwMS00ODQwLWI3ZGUtNmViMjRhNjIxYzQyIiwiY2xpZW50X2lkIjoiaHZxMGZpYzVoY2ZqZXUybGJhOWJobmdrbiIsInVzZXJuYW1lIjoiYmhhdmlrIn0.O0zolzNnPa5KJUDuf00twYKnejOyBKfqevZbDigUUU89bRrXcG_r__1IDcTpOTA2grqMrgV8jmgHql5OTh3biN56_pYyDC529wtuAs3766u1sw8DeJ4HrxMehCHe_FFonfv-O1c3LrIsne-0XPSlHO49mKjB8g-9s78kcyFYuKpPcTNsiw5wgfxIPTiZujpwl7ZQX05IwX6c-Z1y3XTWdKIiI9dwwgogyT9SRvXlcx0c7_rHraixwMIt51AQU0LauMTYuQN03zZ_2xRVZwSD6dehPJUyJDFVswJ6cZHpEyuTdGEfbO3Y9Bfvkp0l5p0WxDqXXaTqor2A-hup2cKckg",
					},
					body: JSON.stringify({
						Records: [
							{
								s3: {
									bucket: {
										name: "hackku-textract-bucket",
									},
									object: {
										key: file.name,
									},
								},
							},
						],
					}),
				}
			);

			const json = await stuff.json();

			const result = await fetch("http://10.104.65.120:5000/api/test", {
				method: "POST",
				body: JSON.stringify({
					input_text: json.body,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await result.json();

			props.setStudySets((prev) => [
				{
					id: Math.random() * 1000,
					name,
					description,
					subject: "Biology",
					icon: "https://cdn-icons-png.flaticon.com/512/2941/2941552.png",
					questions: data.Questions.map((item) => {
						return {
							question: item.question,
							answer: item.answer,
							incorrectAnswers: item.options,
						};
					}),
				},
				...prev,
			]);
			setStatus(false);
		}, 7000);
	};

	return (
		<Sheet
			modal
			snapPoints={[72]}
			fitToContent
			dismissOnSnapToBottom
			zIndex={100_000}
			animation="fast"
			{...props}
		>
			<Sheet.Overlay bc="black" />
			<Sheet.Handle />
			<Sheet.Frame padding="$6" space="$3">
				{status ? (
					<Spinner />
				) : (
					<Form
						minWidth={300}
						space="$3"
						onSubmit={() => setStatus(true)}
					>
						<H2>Create a Study Set</H2>
						<Paragraph>
							Upload a PDF, Text File, or Word Document, and we'll
							automatically create a study set for you!
						</Paragraph>
						<YStack>
							<Label>Name:</Label>
							<Input
								placeholder="Study Set Name"
								onChangeText={setName}
							/>
							<Label>Description:</Label>
							<Input
								placeholder="Description"
								onChangeText={setDescription}
							/>
							<Label>File:</Label>
							{file ? (
								<Paragraph>{file.name}</Paragraph>
							) : (
								<Card
									bc="white"
									mb="$5"
									elevate
									size="$4"
									bordered
									{...props}
									onPress={handleDocumentUpload}
								>
									<Card.Header padded ai="center">
										<H3>Upload</H3>
										<Paragraph theme="alt2">
											PDFs, PPT, TXT, etc.
										</Paragraph>
									</Card.Header>
									<Card.Background></Card.Background>
								</Card>
							)}
						</YStack>
						<Form.Trigger asChild>
							<Button onPress={handleSubmit} bordered bc="$red9">
								Submit
							</Button>
						</Form.Trigger>
					</Form>
				)}
			</Sheet.Frame>
		</Sheet>
	);
};

export const HomeScreen = ({ navigation }: any) => {
	const [studySets, setStudySets] = useState(studySetsData);
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				"https://asvbsxgk3m.execute-api.us-east-1.amazonaws.com/Test/user",
				{
					method: "GET",
				}
			);
			const json = await data.json();

			setData(JSON.parse(json.body)[0].studySets);
		};
		fetchData();
	}, []);

	const logOut = async () => {
		cognitoPool.getCurrentUser()?.signOut();

		await AsyncStorage.removeItem("REFRESH_TOKEN");

		navigation.reset({
			index: 0,
			routes: [{ name: "Onboard" }],
		});
	};

	return (
		<YStack px="$3.5" py="$5" space="$2.5" pos="relative" flex={1}>
			<XStack jc="space-between" ai="center">
				<H2>Welcome!</H2>
				<Avatar circular onPress={logOut}>
					<Avatar.Image src="https://picsum.photos/200" />
				</Avatar>
			</XStack>

			<Paragraph>Your Study Sets</Paragraph>

			<YStack space="$5">
				<ScrollView space="$5" showsVerticalScrollIndicator={false}>
					{studySets.length ? (
						studySets.map((studySet) => (
							<StudySetPreview
								key={studySet.id + Math.random()}
								studySet={studySet}
								navigation={navigation}
							/>
						))
					) : (
						<Stack>
							<H3>You don't have any study sets yet!</H3>
							<Paragraph>Try adding one!</Paragraph>
						</Stack>
					)}

					{/* <Button onPress={testData}>Test!</Button> */}
				</ScrollView>
			</YStack>

			<XStack pos="absolute" bottom={25} right={25}>
				<Button
					bordered
					bc="$red11"
					size="$5"
					onPress={() => setOpen(true)}
				>
					Create
				</Button>
			</XStack>

			<CreateNewStudySet
				open={open}
				onOpenChange={setOpen}
				setStudySets={setStudySets}
			/>
		</YStack>
	);
};
