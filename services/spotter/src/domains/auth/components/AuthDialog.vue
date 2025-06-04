<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { useAuthDialog } from "../composables/useAuthDialog";
import { useRegisterForm } from "../composables/useRegisterForm";

const { isOpen, setState, close } = useAuthDialog();
const { t } = useI18n();
const { setAccessToken } = useUserInformation();
const { sonnerError } = useSonner();
const { RegisterForm, registerFormValue, checkRegisterForm } = useRegisterForm();

const firebaseTokenToRegister = ref<string | null>(null);

async function googleSign() {
	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);

	try {
		const userCredential = await signInWithPopup(auth, provider);
		const firebaseToken = await userCredential.user.getIdToken();

		await horizonClient
			.post(
				"/login",
				{
					body: { firebaseToken },
					disabledSonner: ["user.notfound"],
				},
			)
			.whenInformation(
				"user.logged",
				({ body: { accessToken } }) => {
					setAccessToken(accessToken);
					close();
				},
			)
			.whenInformation(
				"user.notfound",
				() => {
					firebaseTokenToRegister.value = firebaseToken;
					registerFormValue.value.username = userCredential.user.email?.split("@").shift() ?? "";
				},
			)
			.iWantExpectedResponse();
	} catch {
		sonnerError(t("authDialog.googleSignError"));
	}
}

function register() {
	const result = checkRegisterForm();

	if (!result || !firebaseTokenToRegister.value) {
		return;
	}

	void horizonClient
		.post(
			"/register",
			{
				body: {
					firebaseToken: firebaseTokenToRegister.value,
					username: result.username,
				},
			},
		)
		.whenInformation(
			"user.registered",
			({ body: { accessToken } }) => {
				setAccessToken(accessToken);
				close();
			},
		);
}

watch(
	isOpen,
	(value) => {
		if (value) {
			return;
		}
		firebaseTokenToRegister.value = null;
	},
);
</script>

<template>
	<DSDialog
		:open="isOpen"
		@update:open="setState"
	>
		<template #title>
			{{ $t("authDialog.title") }}
		</template>

		<template #description>
			{{ $t("authDialog.subtitle") }}
		</template>

		<template #content>
			<div v-if="!firebaseTokenToRegister">
				<DSButton
					variant="outline"
					size="full"
					@click="googleSign"
				>
					<DSGoogleLogo />
					Google
				</DSButton>
			</div>

			<div v-else>
				<RegisterForm @submit="register">
					<DSButton
						variant="primary"
						type="submit"
					>
						{{ $t("cta.register") }}
					</DSButton>
				</RegisterForm>
			</div>
		</template>
	</DSDialog>
</template>
