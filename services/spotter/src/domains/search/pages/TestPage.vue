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

const scratchRef = ref<InstanceType<typeof TheScratch> | null>();
</script>

<template>
	<TheScratch
		ref="scratchRef"
		v-model="content"
	/>

	<DSButtonPrimary @click="scratchRef!.checkFields()">
		check
	</DSButtonPrimary>
</template>
