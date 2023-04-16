import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useCallback, useState, useEffect } from "react";
import { Button, Input, Label, Stack, Text, XStack, YStack } from "tamagui";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: "us-east-1_VRoNqnQfv",
	ClientId: "hvq0fic5hcfjeu2lba9bhngkn",
};

export const cognitoPool = new CognitoUserPool(poolData);

export const OnboardScreen = ({ navigation }: any) => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		getSession();
	}, []);

	const getSession = useCallback(async () => {
		const storageToken = await AsyncStorage.getItem("REFRESH_TOKEN");

		const user = cognitoPool.getCurrentUser();

		if (!user) return;

		user.getSession((err, session) => {
			if (err) return;

			const sessionToken = session?.refreshToken?.token;
			if (sessionToken === storageToken) navigation.navigate("Home");
		});
	}, []);

	const onSubmit = () => {
		const user = new CognitoUser({
			Username: username,
			Pool: cognitoPool,
		});

		const authDetails = new AuthenticationDetails({
			Username: username,
			Password: password,
		});

		user.authenticateUser(authDetails, {
			onSuccess: async (res) => {
				const token = res.getRefreshToken();
				await AsyncStorage.setItem("REFRESH_TOKEN", token.getToken());

				navigation.navigate("Home");
			},
			onFailure: (err) => {},
			newPasswordRequired: (userAttributes, requiredAttributes) => {
				user.completeNewPasswordChallenge(
					"EpicGamer123#!",
					requiredAttributes,
					{
						onSuccess: (res) => {},
						onFailure: (err) => {},
					}
				);
			},
		});
	};

	return (
		<YStack w={300} space="$2">
			<Label>Username</Label>
			<Input
				size="$4"
				borderWidth={2}
				onChangeText={(newText) => setUsername(newText)}
			/>
			<Label>Password</Label>
			<Input
				size="$4"
				borderWidth={2}
				onChangeText={(newText) => setPassword(newText)}
			/>

			<XStack>
				<Text>Forgot password?</Text>
			</XStack>
			<XStack>
				<Stack flex={1} />
				<Button onPress={onSubmit}>Sign In</Button>
			</XStack>
		</YStack>
	);
};
