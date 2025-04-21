<script setup lang="ts">
import type { OperatorAnd, OperatorContent, OperatorOr } from "@vendors/scratch-type";
import { operatorContentWrapper } from "../operatorContentWrapper";
import AddOperatorContent from "./AddOperatorContent.vue";
import SelectOperator from "./SelectOperator.vue";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<OperatorAnd | OperatorOr>({ required: true });

const deleteCount = 1;
function getComponent(item: OperatorContent, index: number) {
	return operatorContentWrapper(
		item,
		{
			onUpdate(value) {
				model.value.content[index] = value;
			},
			remove() {
				model.value.content.splice(index, deleteCount);
			},
		},
	);
}

function newOperatorContent(operatorContent: OperatorContent) {
	model.value.content.push(operatorContent);
}
</script>

<template>
	<div class="py-1 pl-1 rounded-l-sm bg-primary flex flex-col gap-1 select-none">
		<div class="flex justify-between pr-1">
			<SelectOperator
				class="w-[80px]"
				v-model="model.name"
			/>

			<DSIcon
				name="close"
				@click="emit('remove')"
			/>
		</div>

		<div class="bg-white py-1 pl-1 rounded-l-sm flex flex-col gap-1">
			<component
				v-for="(item, index) of model.content"
				:key="index"
				:is="getComponent(item, index)"
			/>

			<AddOperatorContent
				v-if="model.content.length < 10"
				@new-operator-content="newOperatorContent"
			/>
		</div>
	</div>
</template>
