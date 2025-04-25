<script setup lang="ts">
import { type OperatorAnd, type OperatorContent, type OperatorOr } from "@vendors/scratch-type";
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

const operatorBg = computed(() => model.value.name === "and" ? "bg-primary" : "bg-blue-seaence");
const operatorBorder = computed(() => model.value.name === "and" ? "border-primary" : "border-blue-seaence");

function isOperator(item: OperatorContent): boolean {
	return item.type === "operator" && (item.name === "and" || item.name === "or");
}
</script>

<template>
	<div :class="['border-4 rounded-md shadow-sm', operatorBorder]">
		<div :class="['px-2 py-1 flex justify-between items-center text-white', operatorBg]">
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

		<div class="@container p-2 space-y-2 bg-white">
			<div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-2">
				<div
					v-for="(item, index) of model.content"
					:key="index"
					:class="{
						'col-span-full': isOperator(item),
						'relative': true
					}"
				>
					<component :is="getComponent(item, index)" />
				</div>
			</div>

			<AddOperatorContent
				v-if="model.content.length < 10"
				@new-operator-content="newOperatorContent"
			/>

			<ScratchHint
				v-if="hintMessage"
				:message="hintMessage"
				class="mt-1 text-red-500 text-xs"
			/>
		</div>
	</div>
</template>
