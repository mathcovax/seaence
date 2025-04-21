<script setup lang="ts">
import type { Comparator } from "@vendors/scratch-type";
import { getProvidedDragComparatorValue } from "../../provides/dragComparator";

interface Props {
	comparator: Comparator;
}

const props = defineProps<Props>();
const emit = defineEmits<{ deplace: [] }>();
const draggedComparator = getProvidedDragComparatorValue();
function onStartDrag() {
	draggedComparator!.value = () => {
		emit("deplace");
		return props.comparator;
	};
}
function onStopDrag() {
	draggedComparator!.value = null;
}
</script>

<template>
	<div
		draggable="true"
		@dragstart="onStartDrag"
		@dragend="onStopDrag"
	>
		<slot />
	</div>
</template>
