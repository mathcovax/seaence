<script setup lang="ts">
</script>

<template>
	<div class="w-full h-[100vh] flex flex-col items-stretch overflow-auto">
		<TheHeader class="shrink-0" />

		<main class="container grow">
			<RouterView />
		</main>

		<TheFooter />
	</div>
</template>
