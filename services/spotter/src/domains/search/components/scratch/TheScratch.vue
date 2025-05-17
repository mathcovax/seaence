<script setup lang="ts">
import { initDragComparatorProvide } from "./provides/dragComparator";
import { initCheckFieldsProvide } from "./provides/checkFields";
import type { OperatorContent } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import ScratchBase from "./ScratchBase.vue";

const model = defineModel<OperatorContent | null>({ required: true });

initDragComparatorProvide(
	ref(null),
);

const checkFieldsList = initCheckFieldsProvide(
	ref([]),
);

function checkFields(disabledHint = false) {
	return !checkFieldsList.value.filter(
		(checkField) => !checkField(disabledHint),
	).length;
}

defineExpose({
	checkFields,
});

</script>

<template>
	<ScratchBase v-model="model" />
</template>
