<script setup lang="ts">
const { $pt } = notFoundPage.use();
</script>

<template>
	<section
		class="flex flex-col items-center justify-center h-[calc(100vh-6rem-2rem)] gap-4"
	>
		<img
			src="/images/edito/404.png"
			alt="404"
			class="w-full max-w-2xs"
		>

		<h1 class="text-4xl font-bold text-center">
			{{ $pt("title") }}
		</h1>

		<p class="text-center text-muted-foreground">
			{{ $pt("subtitle") }}
		</p>

		<DSButtonPrimary as-child>
			<RouterLink :to="homePage.createTo()">
				{{ $t("cta.backHome") }}
			</RouterLink>
		</DSButtonPrimary>
	</section>
</template>
