<script setup lang="ts">
import { comparatorTextConfig, type ComparatorAuthor } from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";
import BoostButton from "../BoostButton.vue";
import { useAutoFocusInput } from "../../composables/useAutoFocusInput";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorAuthor>({ required: true });
const { t } = useI18n();
const { inputToFocusRef } = useAutoFocusInput({
	canFocus: () => model.value.value === "",
});

const textFieldSchema = zod
	.string({ message: t("formMessage.required") })
	.trim()
	.max(
		comparatorTextConfig.maxLength,
		{ message: t("formMessage.maxLength", { value: comparatorTextConfig.maxLength }) },
	)
	.min(
		comparatorTextConfig.minLength,
		{ message: t("formMessage.minLength", { value: comparatorTextConfig.minLength }) },
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
			<div class="flex gap-2 items-center">
				<BoostButton v-model="model.boost" />

				<span class="font-medium text-sm">{{ $t('search.scratch.comparator.author.label') }}</span>
			</div>

			<DSGhostButton
				square
				@click="emit('remove')"
				icon="close"
			/>
		</div>

		<div class="grid grid-cols-1">
			<DSInput
				ref="inputToFocusRef"
				draggable="false"
				v-model="model.value"
				:placeholder="$t('search.scratch.comparator.author.inputPlaceholder')"
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
