<script setup lang="ts">
</script>

<template>
	<div class="w-full min-h-screen-nh flex flex-col items-stretch">
		<TheHeader />

		<main class="min-h-screen-nh container py-4 grow">
			<RouterView />
		</main>

		<TheFooter />
	</div>
</template>
