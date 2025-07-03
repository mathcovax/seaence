<script setup lang="ts">
const { loaderIsEnabled } = useLoader();
</script>

<template>
	<Teleport to="body">
		<div
			v-if="loaderIsEnabled"
			class="fixed z-100 inset-0 flex flex-col items-center justify-center bg-background opacity-75"
		>
			<DSLoadingLogo />

			<p class="mt-4 text-carbon">
				{{ $t('layout.loader.title') }}
			</p>
		</div>
	</Teleport>
</template>
