<script setup lang="ts">
const { $pt } = notFoundPage.use();
</script>

<template>
	<section
		class="flex flex-col items-center justify-center h-[calc(100vh-6rem-2rem)] gap-4"
	>
		<DSImage
			src="/images/edito/404.png"
			alt="404"
			class="w-[286px] h-[320px]"
		/>

		<h1 class="text-4xl font-bold text-center">
			{{ $pt("title") }}
		</h1>

		<p class="text-center text-muted-foreground">
			{{ $pt("subtitle") }}
		</p>

		<RouterLink :to="homePage">
			<DSPrimaryButton icon="home">
				{{ $t("cta.backHome") }}
			</DSPrimaryButton>
		</RouterLink>
	</section>
</template>
