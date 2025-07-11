<script setup lang="ts">
const { loaderIsEnabled } = useLoader();

function onCLick(event: Event) {
	event.stopImmediatePropagation();
	event.stopPropagation();
	event.preventDefault();
}

</script>

<template>
	<Teleport to="body">
		<div
			v-if="loaderIsEnabled"
			@pointerdown.capture="onCLick"
			class="fixed z-100 inset-0 flex flex-col items-center justify-center bg-background opacity-75"
			style="pointer-events: auto;"
			data-aria-hidden="true"
			aria-hidden="true"
		>
			<DSLoadingLogo />

			<p class="mt-4 text-carbon">
				{{ $t('layout.loader.title') }}
			</p>
		</div>
	</Teleport>
</template>
