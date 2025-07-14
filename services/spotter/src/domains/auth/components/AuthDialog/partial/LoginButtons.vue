<script setup lang="ts">
import type * as FirebaseAuth from "firebase/auth";
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase";
import { match, P } from "ts-pattern";

const emit = defineEmits<{
	resolveLogin: [user: FirebaseAuth.User];
}>();
const { t } = useI18n();
const { sonnerError } = useSonner();
const { enableLoader, disableLoader } = useLoader();

const { firebaseApp } = useFirebaseApp();
const {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} = useFirebaseAuth();
const auth = getAuth(firebaseApp);

type ProviderId = "google";

async function login(providerId: ProviderId) {
	const loaderId = enableLoader();

	const provider = match(providerId)
		.with(
			"google",
			() => new GoogleAuthProvider(),
		)
		.exhaustive();

	try {
		const firebaseUser = await match(auth.currentUser)
			.with(
				null,
				() => signInWithPopup(auth, provider)
					.then(({ user }) => user),
			)
			.with(
				P.not(null),
				(user) => user,
			)
			.exhaustive();

		emit("resolveLogin", firebaseUser);
	} catch (error) {
		console.error(error);
		sonnerError(t("authDialog.googleSignError"));
	} finally {
		disableLoader(loaderId);
		await signOut(auth);
	}
}
</script>

<template>
	<DSOutlineButton
		data-testid="auth-dialog-google-login-button"
		size="full"
		@click="login('google')"
	>
		<DSGoogleLogo />
		Google
	</DSOutlineButton>
</template>
