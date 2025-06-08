<script setup lang="ts">
import type { OperatorContent, OperatorNot } from "@vendors/types-advanced-query";
import { operatorContentWrapper } from "../operatorContentWrapper";
import AddOperatorContent from "./AddOperatorContent.vue";
import { useHintMessage } from "../../composables/useHintMessage";
import ScratchHint from "../ScratchHint.vue";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<OperatorNot>({ required: true });
const { t } = useI18n();
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

const minLength = 1;
const operatorSchema = zod
	.object(
		{},
		{ message: t("formMessage.minItems", { value: minLength }) },
	);

const { hintMessage } = useHintMessage(
	operatorSchema,
	computed({
		get() {
			return model.value.content;
		},
		set() {},
	}),
);
</script>

<template>
	<div class="border-4 border-pink-seaence rounded-md shadow-sm">
		<div class="h-11 flex justify-between items-center px-2 py-1 text-white bg-pink-seaence">
			<span class="font-medium text-sm">{{ $t("search.scratch.operator.not.label") }}</span>

			<DSButton
				variant="ghost"
				square
				class="text-white"
				@click="emit('remove')"
			>
				<DSIcon name="close" />
			</DSButton>
		</div>

		<div class="bg-background p-2">
			<div v-if="model.content">
				<component :is="getComponent(model.content)" />
			</div>

			<AddOperatorContent
				v-if="!model.content"
				@new-operator-content="newOperatorContent"
			/>

			<ScratchHint
				v-if="hintMessage"
				:message="hintMessage"
				class="mt-1"
			/>
		</div>
	</div>
</template>
