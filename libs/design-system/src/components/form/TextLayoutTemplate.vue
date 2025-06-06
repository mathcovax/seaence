<script setup lang="ts">
interface Props {
	content: string;
	formKey: string;
	cols: number;
}

defineProps<Props>();
</script>

<template>
	<p
		:style="{
			'grid-column': `span ${cols} / span ${cols}`
		}"
		class="flex flex-col gap-2"
	>
		{{ content }}
	</p>
</template>
