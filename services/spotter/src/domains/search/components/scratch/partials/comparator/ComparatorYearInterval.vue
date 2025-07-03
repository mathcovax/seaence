<script setup lang="ts">
import {
	comparatorYearConfig,
	yearFieldEnum,
	type ComparatorYearInterval,
} from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";
import BoostButton from "../BoostButton.vue";
import { useAutoFocusInput } from "../../composables/useAutoFocusInput";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorYearInterval>({ required: true });
const { t } = useI18n();
const { inputToFocusRef } = useAutoFocusInput({
	canFocus: () => isNaN(model.value.value.from),
});

const yearSchema = zod
	.number({ message: t("formMessage.required") })
	.int({ message: t("formMessage.int") })
	.max(
		comparatorYearConfig.max,
		{ message: t("formMessage.max", { value: comparatorYearConfig.max }) },
	)
	.min(
		comparatorYearConfig.min,
		{ message: t("formMessage.min", { value: comparatorYearConfig.min }) },
	);

const yearIntervalFieldSchema = zod
	.object({
		from: yearSchema,
		to: yearSchema,
	})
	.refine(
		({ from, to }) => to >= from,
		t("search.scratch.comparator.yearInterval.refineMessage"),
	);

const { hintMessage } = useHintMessage(
	yearIntervalFieldSchema,
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

				<span class="font-medium text-sm">{{ $t('search.scratch.comparator.yearInterval.label') }}</span>
			</div>

			<DSGhostButton
				square
				@click="emit('remove')"
				icon="close"
			/>
		</div>

		<div class="grid grid-cols-1 @sm:grid-cols-3 gap-2">
			<DSSelect
				:items="yearFieldEnum.toTuple()"
				:label="(item) => $t(`search.scratch.comparator.yearInterval.fields.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.yearInterval.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				ref="inputToFocusRef"
				@dragstart.prevent
				type="number"
				mode="numeric"
				v-model.number="model.value.from"
				placeholder="1999"
				class="text-sm"
			/>

			<DSInput
				@dragstart.prevent
				type="number"
				mode="numeric"
				v-model.number="model.value.to"
				placeholder="1999"
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
