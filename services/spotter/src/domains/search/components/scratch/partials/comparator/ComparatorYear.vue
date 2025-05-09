<script setup lang="ts">
import { yearFieldEnum, type ComparatorYear } from "@vendors/scratch-type";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorYear>({ required: true });
const { t } = useI18n();

const yearFieldSchema = zod
	.number({ message: t("formMessage.required") })
	.int({ message: t("formMessage.int") })
	.positive({ message: t("formMessage.positive") });

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
		class="@container p-1.5 bg-white border-l-4 rounded-md drop-shadow-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="mb-2 flex justify-between items-center">
			<div class="flex gap-2 items-center">
				<span class="font-medium text-sm">{{ $t('scratch.comparator.year.label') }}</span>
			</div>

			<DSButtonIcon
				variant="ghost"
				size="sm"
				@click="emit('remove')"
				class="text-slate-500 hover:bg-slate-100 hover:text-slate-700"
			>
				<DSIcon name="close" />
			</DSButtonIcon>
		</div>

		<div class="grid grid-cols-1 @sm:grid-cols-2 gap-2">
			<DSSelect
				:items="yearFieldEnum.toTuple()"
				:label="(item) => $t(`scratch.comparator.year.fields.${item}`) || item"
				:placeholder="$t('scratch.comparator.year.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				type="number"
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
