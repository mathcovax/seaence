<script setup lang="ts">
interface Props {
	label?: string;
}

defineProps<Props>();

</script>

<template>
	<div class="py-2 flex items-center">
		<div
			class="h-px flex-grow border-t border-blue-seaence"
		/>

		<span
			v-if="label"
			class="px-3 text-xs font-medium text-blue-seaence"
		>
			{{ label }}
		</span>

		<div
			v-if="label"
			class="h-px flex-grow border-t border-blue-seaence"
		/>
	</div>
</template>
