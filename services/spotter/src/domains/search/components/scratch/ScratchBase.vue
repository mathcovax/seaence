<script setup lang="ts">
import type { OperatorContent } from "@vendors/types-advanced-query";
import AddOperatorContent from "./partials/operator/AddOperatorContent.vue";
import { operatorContentWrapper } from "./partials/operatorContentWrapper";
import { useHintMessage } from "./composables/useHintMessage";
import ScratchHint from "./partials/ScratchHint.vue";

const { t } = useI18n();
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

const minLength = 1;
const scratchSchema = zod
	.object(
		{},
		{ message: t("formMessage.minItems", { value: minLength }) },
	);

const { hintMessage } = useHintMessage(
	scratchSchema,
	computed({
		get() {
			return model.value;
		},
		set() {},
	}),
);

</script>

<template>
	<div>
		<template v-if="model">
			<component :is="getComponent()" />
		</template>

		<div
			v-else
			class="h-full"
		>
			<AddOperatorContent @new-operator-content="newOperatorContent" />

			<ScratchHint
				v-if="hintMessage"
				:message="hintMessage"
				class="mt-1"
			/>
		</div>
	</div>
</template>
