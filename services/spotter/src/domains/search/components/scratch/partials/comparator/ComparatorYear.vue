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
		class="flex flex-col gap-1 bg-secondary p-1 rounded-l-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="flex justify-between">
			<p>{{ $t('scratch.comparator.year.label') }}</p>

			<DSIcon
				name="close"
				@click="emit('remove')"
			/>
		</div>

		<div class="flex gap-1">
			<DSSelect
				class="w-1/2"
				:items="yearFieldEnum.toTuple()"
				:label="(item) => $t(`scratch.comparator.year.fields.${item}`)"
				:placeholder="$t('scratch.comparator.year.selectPlaceholder')"
				v-model="model.field"
			/>

			<DSInput
				class="w-1/2"
				type="number"
				v-model="model.value"
			/>
		</div>

		<ScratchHint
			v-if="hintMessage"
			:message="hintMessage"
		/>
	</DraggableComparator>
</template>
