<script setup lang="ts">
const { pt } = usePageTranslate();
</script>

<template>
	<section class="grid h-[calc(100vh-6rem-2rem)] lg:grid-cols-2">
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs flex flex-col gap-6">
				<div class="flex flex-col items-center gap-2 text-center">
					<h1 class="text-2xl font-bold">
						{{ pt("title") }}
					</h1>

					<p class="text-balance text-sm text-muted-foreground">
						{{ pt("subtitle") }}
					</p>
				</div>

				<DSButtonOutline class="w-full">
					<DSGoogleLogo />
					Google
				</DSButtonOutline>
			</div>
		</div>

		<div class="hidden lg:flex items-center justify-center">
			<img
				src="/images/auth/connection.png"
				alt="connection"
				class="w-full"
			>
		</div>
	</section>
</template>
