<script setup lang="ts">
import DSLabel from "../ui/label/DSLabel.vue";

interface Props {
	label?: string;
	formKey: string;
	cols: number;
}

defineProps<Props>();
</script>

<template>
	<div
		:style="{
			'grid-column': `span ${cols} / span ${cols}`
		}"
		class="flex flex-col gap-2"
	>
		<DSLabel
			v-if="label"
			class="text-sm font-medium leading-none select-none"
			:for="formKey"
		>
			{{ label }}
		</DSLabel>

		<slot />
	</div>
</template>
