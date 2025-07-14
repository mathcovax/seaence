<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { useAuthDialog } from "../../composables/useAuthDialog";
import { useRegisterForm } from "../../composables/useRegisterForm";
import type * as FirebaseAuth from "firebase/auth";
import LoginButtonsSkeleton from "./partial/LoginButtonsSkeleton.vue";

const { isOpen, setState, close } = useAuthDialog();
const { setAccessToken } = useUserInformation();
const { RegisterForm, registerFormValue, checkRegisterForm } = useRegisterForm();

const firebaseTokenToRegister = ref<string | null>(null);

const LoginButtons = defineAsyncComponent(() => import("./partial/LoginButtons.vue"));

async function login(
	firebaseUser: FirebaseAuth.User,
) {
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
				<Suspense>
					<LoginButtons @resolve-login="login" />

					<template #fallback>
						<LoginButtonsSkeleton />
					</template>
				</Suspense>
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
