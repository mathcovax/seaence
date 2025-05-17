<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { horizonClient } from "@/lib/horizon";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { $pt } = connectionPage.use();
const router = useRouter();
const { setAccessToken, promisedRequestInformation } = useUserInformation();

void promisedRequestInformation.value!
	.then(({ information }) => {
		if (information === "user.self") {
			void router.push(
				homePage.createTo(),
			);
		}
	});

const { sonnerError } = useSonner();

async function googleSign() {
	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);

	try {
		const userCredential = await signInWithPopup(auth, provider);
		const fireBaseIdToken = await userCredential.user.getIdToken();

		await horizonClient
			.post(
				"/authentication",
				{
					body: fireBaseIdToken,
				},
			)
			.whenInformation(
				"user.logged",
				({ body: accessToken }) => {
					setAccessToken(accessToken);
					void router.push(
						homePage.createTo(),
					);
				},
			);
	} catch {
		sonnerError($pt("googleSignError"));
	}
}
</script>

<template>
	<section class="h-[calc(100vh-6rem-2rem)] grid lg:grid-cols-2">
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs flex flex-col gap-6">
				<div class="flex flex-col items-center gap-2 text-center">
					<h1 class="text-2xl font-bold">
						{{ $pt("title") }}
					</h1>

					<p class="text-balance text-sm text-muted-foreground">
						{{ $pt("subtitle") }}
					</p>
				</div>

				<DSButtonOutline
					@click="googleSign"
					class="w-full"
				>
					<DSGoogleLogo />
					Google
				</DSButtonOutline>
			</div>
		</div>

		<div class="hidden lg:flex items-center justify-center">
			<DSImage
				src="/images/auth/connection.png"
				alt="connection"
				class="w-[430px] h-[280px]"
			/>
		</div>
	</section>
</template>
