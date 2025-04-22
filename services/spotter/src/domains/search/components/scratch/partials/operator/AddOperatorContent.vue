<script setup lang="ts">
import type { OperatorContent } from "@vendors/scratch-type";
import { getProvidedDragComparatorValue } from "../../provides/dragComparator";
import OperatorContentDialog from "../OperatorContentDialog.vue";

const emit = defineEmits<{
	newOperatorContent: [OperatorContent: OperatorContent];
}>();

const refOperatorContentDialog = ref<InstanceType<typeof OperatorContentDialog> | null>();
async function addOperatorContent() {
	const result = await refOperatorContentDialog.value!.openDialog();

	if (result) {
		emit("newOperatorContent", result);
	}
}

const isDragHover = ref(false);
const draggedComparator = getProvidedDragComparatorValue();
function onDropComparatorElement() {
	isDragHover.value = false;
	if (!draggedComparator?.value) {
		return;
	}

	emit("newOperatorContent", draggedComparator.value());
}
</script>

<template>
	<OperatorContentDialog ref="refOperatorContentDialog" />

	<div
		class="flex justify-center p-1 bg-gray-100 rounded-sm hover:bg-gray-200 hover:cursor-pointer transition-all"
		:class="{
			'bg-gray-300': isDragHover
		}"
		@click="addOperatorContent"
		@dragover.prevent="isDragHover = true"
		@dragleave="isDragHover = false"
		@dragenter.prevent
		@drop="onDropComparatorElement"
	>
		<DSIcon
			name="plus"
		/>
	</div>
</template>
