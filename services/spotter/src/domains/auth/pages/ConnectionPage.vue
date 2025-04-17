<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { horizonClient } from "@/lib/horizon";

const { $pt } = connectionPage.use();

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

async function googleSign() {
	try {
		const userCredential = await signInWithPopup(auth, provider);
		const fireBaseIdToken = await userCredential.user.getIdToken();

		await horizonClient.post(
			"/authentication",
			{
				body: fireBaseIdToken,
			},
		).whenInformation(
			"user.logged",
			() => {
				// Handle user logged in
			},
		).whenInformation(
			"credential.invalid",
			() => {
				// Handle invalid credential
			},
		);
	} catch {
		// Handle error
	}
}
</script>

<template>
	<section class="grid h-[calc(100vh-6rem-2rem)] lg:grid-cols-2">
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
