<script setup lang="ts">
const { isLoading } = useLoader();
</script>

<template>
	<div
		v-if="isLoading"
		class="fixed z-50 inset-0 flex flex-col items-center justify-center bg-white opacity-75"
	>
		<DSLoadingLogo />

		<p class="mt-4 text-carbon">
			Chargement...
		</p>
	</div>
</template>
