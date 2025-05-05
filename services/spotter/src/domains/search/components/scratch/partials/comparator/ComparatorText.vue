<script setup lang="ts">
import { type ComparatorText, textFieldEnum } from "@vendors/types-advanced-query";
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
		class="@container p-1.5 bg-white border-l-4 rounded-md drop-shadow-sm"
		:comparator="model"
		@deplace="emit('remove')"
	>
		<div class="mb-2 flex justify-between items-center">
			<span class="font-medium text-sm">{{ $t('scratch.comparator.text.label') }}</span>

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
				:label="(item) => $t(`scratch.comparator.text.fields.${item}`) || item"
				:placeholder="$t('scratch.comparator.text.selectPlaceholder')"
				v-model="model.field"
				class="text-sm"
			/>

			<DSInput
				v-model="model.value"
				:placeholder="$t('scratch.comparator.text.inputPlaceholder')"
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
