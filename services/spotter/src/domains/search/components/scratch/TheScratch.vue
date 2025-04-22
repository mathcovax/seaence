<script setup lang="ts">
import type { OperatorContent } from "@vendors/scratch-type";
import AddOperatorContent from "./partials/operator/AddOperatorContent.vue";
import { operatorContentWrapper } from "./partials/operatorContentWrapper";
import { initDragComparatorProvide } from "./provides/dragComparator";
import { initCheckFieldsProvide } from "./provides/checkFields";

const model = defineModel<OperatorContent | null>({ required: true });

function getComponent() {
	if (model.value) {
		return operatorContentWrapper(
			model.value,
			{
				onUpdate(value) {
					model.value = value;
				},
				remove() {
					model.value = null;
				},
			},
		);
	}
}

function newOperatorContent(operatorContent: OperatorContent) {
	model.value = operatorContent;
}

initDragComparatorProvide(
	ref(null),
);

const checkFields = initCheckFieldsProvide(
	ref([]),
);

defineExpose({
	checkFields() {
		return !checkFields.value.filter(
			(checkField) => !checkField(),
		).length;
	},
});

</script>

<template>
	<template v-if="model">
		<component :is="getComponent()" />
	</template>

	<AddOperatorContent
		v-else
		@new-operator-content="newOperatorContent"
	/>
</template>
