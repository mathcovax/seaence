<script setup lang="ts">
import { comparatorTextConfig, textFieldEnum, type ComparatorStrictText } from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorStrictText>({ required: true });
const { t } = useI18n();

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
			<span class="font-medium text-sm">{{ $t('search.scratch.comparator.strictText.label') }}</span>

			<DSButtonIcon
				variant="ghost"
				size="sm"
				@click="emit('remove')"
				class="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
			>
				<DSIcon name="close" />
			</DSButtonIcon>
		</div>

		<div class="grid grid-cols-1 @sm:grid-cols-2 gap-2">
			<DSSelect
				:items="textFieldEnum.toTuple()"
				:label="(item) => $t(`search.scratch.comparator.strictText.fields.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.strictText.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				draggable="false"
				v-model="model.value"
				:placeholder="$t('search.scratch.comparator.strictText.inputPlaceholder')"
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
