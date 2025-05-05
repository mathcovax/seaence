<script setup lang="ts">
import { type OperatorAnd, type OperatorContent, type OperatorOr } from "@vendors/types-advanced-query";
import { operatorContentWrapper } from "../operatorContentWrapper";
import AddOperatorContent from "./AddOperatorContent.vue";
import SelectOperator from "./SelectOperator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<OperatorAnd | OperatorOr>({ required: true });
const { t } = useI18n();

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

const minLength = 1;
const operatorSchema = zod
	.any()
	.array()
	.min(minLength, { message: t("formMessage.minItems", { value: minLength }) });

const { hintMessage } = useHintMessage(
	operatorSchema,
	computed({
		get() {
			return model.value.content;
		},
		set() {},
	}),
);

const sortedContents = computed(() => {
	const contentsWithContentIndex = model.value.content.map(
		(item, index) => ({
			contentIndex: index,
			item,
		}),
	);

	return {
		comparators: contentsWithContentIndex.filter(
			({ item }) => item.type === "comparator",
		),
		operators: contentsWithContentIndex.filter(
			({ item }) => item.type === "operator",
		),
	};
});

function comparatorTakefullWidth(index: number) {
	const offset = 1;
	const pos = index + offset;

	return !isEven(pos) && pos === sortedContents.value.comparators.length;
}
</script>

<template>
	<div
		class="border-4 rounded-md shadow-sm"
		:class="{
			'border-primary': model.name === 'and',
			'border-green-seaence': model.name === 'or',
		}"
	>
		<div
			class="px-2 py-1 flex justify-between items-center text-white"
			:class="{
				'bg-primary': model.name === 'and',
				'bg-green-seaence': model.name === 'or',
			}"
		>
			<SelectOperator
				class="w-20 text-white font-medium bg-white bg-opacity-20 border-0 rounded"
				v-model="model.name"
			/>

			<DSButtonIcon
				variant="ghost"
				size="xs"
				@click="emit('remove')"
				class="text-white hover:bg-white hover:bg-opacity-20"
			>
				<DSIcon name="close" />
			</DSButtonIcon>
		</div>

		<div class="@container p-2 space-y-2">
			<AddOperatorContent
				v-if="model.content.length < 10"
				@new-operator-content="newOperatorContent"
			/>

			<div class="grid grid-cols-1 @sm:grid-cols-2 gap-2">
				<component
					v-for="({item, contentIndex}, index) of sortedContents.comparators"
					:key="contentIndex"
					:is="getComponent(item, contentIndex)"
					class="col-span-1"
					:class="{
						'!col-span-full': comparatorTakefullWidth(index),
					}"
				/>

				<component
					v-for="{item, contentIndex} of sortedContents.operators"
					:key="contentIndex"
					:is="getComponent(item, contentIndex)"
					class="col-span-full"
				/>
			</div>

			<ScratchHint
				v-if="hintMessage"
				:message="hintMessage"
				class="mt-1"
			/>
		</div>
	</div>
</template>
