<script setup lang="ts">
import { comparatorConfig, yearFieldEnum, type ComparatorYear } from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorYear>({ required: true });
const { t } = useI18n();

const yearFieldSchema = zod
	.number({ message: t("formMessage.required") })
	.int({ message: t("formMessage.int") })
	.max(
		comparatorConfig.year.max,
		{ message: t("formMessage.max", { value: comparatorConfig.year.max }) },
	)
	.min(
		comparatorConfig.year.min,
		{ message: t("formMessage.min", { value: comparatorConfig.year.min }) },
	);

const { hintMessage } = useHintMessage(
	yearFieldSchema,
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
				<span class="font-medium text-sm">{{ $t('search.scratch.comparator.year.label') }}</span>
			</div>

			<DSButton
				variant="ghost"
				size="icon"
				@click="emit('remove')"
			>
				<DSIcon name="close" />
			</DSButton>
		</div>

		<div class="grid grid-cols-1 @sm:grid-cols-2 gap-2">
			<DSSelect
				:items="yearFieldEnum.toTuple()"
				:label="(item) => $t(`search.scratch.comparator.year.fields.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.year.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				@dragstart.prevent
				type="number"
				mode="numeric"
				v-model="model.value"
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
