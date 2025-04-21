<script setup lang="ts">
import type { OperatorContent } from "@vendors/scratch-type";
import TheScratch from "../components/scratch/TheScratch.vue";

const content = ref<OperatorContent | null>({
	type: "operator",
	name: "and",
	content: [
		{
			type: "comparator",
			name: "text",
			field: "allField",
			value: "",
		},
	],
});

watch(
	content,
	(value) => void console.log(value),
	{ deep: true },
);
</script>

<template>
	<TheScratch v-model="content" />
</template>
