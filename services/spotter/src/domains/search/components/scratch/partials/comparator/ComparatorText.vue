<script setup lang="ts">
import { type ComparatorText, textFieldEnum } from "@vendors/scratch-type";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorText>({ required: true });
const { t } = useI18n();

const minLength = 1;
const textFieldSchema = zod
	.string({ message: t("formMessage.required") })
	.trim()
	.min(minLength, { message: t("formMessage.minLength", { value: minLength }) });

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
		class="flex flex-col gap-1 bg-secondary p-1 rounded-l-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="flex justify-between">
			<p>{{ $t('scratch.comparator.text.label') }}</p>

			<DSIcon
				name="close"
				@click="emit('remove')"
			/>
		</div>

		<div class="flex gap-1">
			<DSSelect
				class="w-1/2"
				:items="textFieldEnum.toTuple()"
				:label="(item) => $t(`scratch.comparator.text.fields.${item}`)"
				:placeholder="$t('scratch.comparator.text.selectPlaceholder')"
				v-model="model.field"
			/>

			<DSInput
				class="w-1/2"
				v-model="model.value"
			/>
		</div>

		<ScratchHint
			v-if="hintMessage"
			:message="hintMessage"
		/>
	</DraggableComparator>
</template>
