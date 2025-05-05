<script setup lang="ts">
import type { OperatorContent } from "@vendors/types-advanced-query";
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
	<section class="min-h-[calc(100vh-6rem-2rem)]">
		<TheScratch
			ref="scratchRef"
			v-model="content"
		/>

		<DSButtonPrimary @click="scratchRef!.checkFields()">
			{{ $t("scratch.checkFields") }}
		</DSButtonPrimary>
	</section>
</template>
