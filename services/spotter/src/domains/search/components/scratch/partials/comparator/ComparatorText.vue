<script setup lang="ts">
import { comparatorConfig, type ComparatorText, textFieldEnum } from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorText>({ required: true });
const { t } = useI18n();

const textFieldSchema = zod
	.string({ message: t("formMessage.required") })
	.trim()
	.max(
		comparatorConfig.text.maxLength,
		{ message: t("formMessage.maxLength", { value: comparatorConfig.text.maxLength }) },
	)
	.min(
		comparatorConfig.text.minLength,
		{ message: t("formMessage.minLength", { value: comparatorConfig.text.minLength }) },
	);

const { hintMessage } = useHintMessage(
	textFieldSchema,
	computed({
		get() {
			return model.value.value;
		},
		set(value) {
			model.value.value = value;
		},
	}),
);
</script>

<template>
	<DraggableComparator
		class="@container p-1.5 bg-background border-l-4 rounded-md drop-shadow-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="mb-2 flex justify-between items-center">
			<span class="font-medium text-sm">{{ $t('search.scratch.comparator.text.label') }}</span>

			<DSGhostButton
				square
				@click="emit('remove')"
			>
				<DSIcon name="close" />
			</DSGhostButton>
		</div>

		<div class="grid grid-cols-1 @sm:grid-cols-2 gap-2">
			<DSSelect
				:items="textFieldEnum.toTuple()"
				:label="(item) => $t(`search.scratch.comparator.text.fields.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.text.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				@dragstart="console.log('test')"
				draggable="false"
				v-model="model.value"
				:placeholder="$t('search.scratch.comparator.text.inputPlaceholder')"
				class="text-sm"
			/>
		</div>

		<ScratchHint
			v-if="hintMessage"
			:message="hintMessage"
			class="mt-1"
		/>
	</DraggableComparator>
</template>
