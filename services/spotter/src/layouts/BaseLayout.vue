<script setup lang="ts">
</script>

<template>
	<div class="w-full min-h-screen-nh flex flex-col items-stretch">
		<TheHeader class="shrink-0" />

		<main class="container grow">
			<RouterView />
		</main>

		<TheFooter />
	</div>
</template>
