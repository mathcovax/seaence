<script setup lang="ts">
import type { OperatorContent } from "@vendors/types-advanced-query";
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
	<div class="mb-6 p-4 bg-white border rounded-lg shadow-sm">
		<div class="pb-2 mb-4 flex items-center justify-between border-b border-slate-200">
			<h3 class="text-lg font-medium text-primary">
				{{ $t('scratch.title') }}
			</h3>
		</div>

		<div class="p-2 bg-slate-50 border rounded-md border-dashed border-slate-300">
			<template v-if="model">
				<component :is="getComponent()" />
			</template>

			<div
				v-else
				class="h-full flex items-center justify-center"
			>
				<AddOperatorContent @new-operator-content="newOperatorContent" />
			</div>
		</div>

		<div
			v-if="model"
			class="mt-4 flex justify-end"
		>
			<div class="flex gap-2">
				<DSButtonOutline
					size="sm"
					@click="model = null"
				>
					{{ $t('scratch.reset') }}
				</DSButtonOutline>
			</div>
		</div>
	</div>
</template>
