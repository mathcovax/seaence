<script setup lang="ts">
const { loaderIsEnabled } = useLoader();
</script>

<template>
	<div
		v-if="loaderIsEnabled"
		class="fixed z-50 inset-0 flex flex-col items-center justify-center bg-background opacity-75"
	>
		<DSAdminLoadingLogo />

		<p class="mt-4 text-carbon">
			{{ $t('layout.loader.title') }}
		</p>
	</div>
</template>
