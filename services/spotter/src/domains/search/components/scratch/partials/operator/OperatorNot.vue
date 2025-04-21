<script setup lang="ts">
import type { OperatorContent, OperatorNot } from "@vendors/scratch-type";
import { operatorContentWrapper } from "../operatorContentWrapper";
import AddOperatorContent from "./AddOperatorContent.vue";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<OperatorNot>({ required: true });

function getComponent(item: OperatorContent) {
	return operatorContentWrapper(
		item,
		{
			onUpdate(value) {
				model.value.content = value;
			},
			remove() {
				model.value.content = null;
			},
		},
	);
}

function newOperatorContent(operatorContent: OperatorContent) {
	model.value.content = operatorContent;
}
</script>

<template>
	<div class="py-1 pl-1 rounded-l-sm bg-primary flex flex-col gap-1 select-none">
		<div class="flex justify-between pr-1">
			<p>{{ $t("scratch.operator.not.label") }}</p>

			<DSIcon
				name="close"
				@click="emit('remove')"
			/>
		</div>

		<div class="bg-white py-1 pl-1 rounded-l-sm flex flex-col gap-1">
			<component
				v-if="model.content"
				:is="getComponent(model.content)"
			/>

			<AddOperatorContent
				v-if="!model.content"
				@new-operator-content="newOperatorContent"
			/>
		</div>
	</div>
</template>
