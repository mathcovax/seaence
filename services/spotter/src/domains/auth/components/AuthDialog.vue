<script setup lang="ts">
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { useAuthDialog } from "../composables/useAuthDialog";
import { useRegisterForm } from "../composables/useRegisterForm";
import { match, P } from "ts-pattern";

const { isOpen, setState, close } = useAuthDialog();
const { t } = useI18n();
const { setAccessToken } = useUserInformation();
const { sonnerError } = useSonner();
const { enableLoader, disableLoader } = useLoader();
const { RegisterForm, registerFormValue, checkRegisterForm } = useRegisterForm();

const firebaseTokenToRegister = ref<string | null>(null);

async function googleSign() {
	const { firebaseApp } = await useFirebaseApp();
	const { GoogleAuthProvider, getAuth, signInWithPopup, signOut } = await useFirebaseAuth();

	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);

	const loaderId = enableLoader();

	try {
		const firebaseUser = await match(auth.currentUser)
			.with(
				null,
				async() => {
					const userCredential = await signInWithPopup(auth, provider);
					return userCredential.user;
				},
			)
			.with(
				P.not(null),
				(user) => user,
			)
			.exhaustive();

		const firebaseToken = await firebaseUser.getIdToken();

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
					registerFormValue.value.username = firebaseUser.email?.split("@").shift() ?? "";
				},
			)
			.iWantExpectedResponse();
	} catch {
		sonnerError(t("authDialog.googleSignError"));
	} finally {
		disableLoader(loaderId);
		await signOut(auth);
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
					language: result.language,
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
		data-testid="auth-dialog"
	>
		<template #title>
			{{ $t("authDialog.title") }}
		</template>

		<template #description>
			{{ $t("authDialog.subtitle") }}
		</template>

		<template #content>
			<div v-if="!firebaseTokenToRegister">
				<DSOutlineButton
					data-testid="auth-dialog-google-sign-button"
					size="full"
					@click="googleSign"
				>
					<DSGoogleLogo />
					Google
				</DSOutlineButton>
			</div>

			<div v-else>
				<RegisterForm
					data-testid="auth-dialog-register-form"
					@submit="register"
				>
					<DSPrimaryButton
						data-testid="auth-dialog-register-form-submit-button"
						size="full"
						type="submit"
					>
						{{ $t("cta.register") }}
					</DSPrimaryButton>
				</RegisterForm>
			</div>
		</template>
	</DSDialog>
</template>
