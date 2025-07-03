<script setup lang="ts">
import {
	articleTypeEnum,
	type ComparatorArticleType,
	comparatorArticleTypeConfig,
} from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import BoostButton from "../BoostButton.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";
import { useAutoFocusInput } from "../../composables/useAutoFocusInput";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorArticleType>({ required: true });
const { t } = useI18n();
const { inputToFocusRef } = useAutoFocusInput({
	canFocus: () => !model.value.value.length,
});

const textFieldSchema = zod
	.any()
	.array()
	.min(
		comparatorArticleTypeConfig.minContent,
		{ message: t("formMessage.minItems", { value: comparatorArticleTypeConfig.minContent }) },
	);

const { hintMessage } = useHintMessage(
	textFieldSchema,
	computed({
		get() {
			return model.value.value;
		},
		set() {},
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

				<span class="font-medium text-sm">{{ $t('search.scratch.comparator.articleType.label') }}</span>
			</div>

			<DSGhostButton
				square
				@click="emit('remove')"
				icon="close"
			/>
		</div>

		<div class="grid grid-cols-1">
			<DSMultiComboBox
				ref="inputToFocusRef"
				:empty-label="$t('search.scratch.comparator.articleType.emptyLabel')"
				:items="articleTypeEnum.toTuple()"
				:label="(item) => $t(`articleType.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.articleType.selectPlaceholder')"
				v-model="model.value"
				class="text-sm w-full"
			/>
		</div>

		<ScratchHint
			v-if="hintMessage"
			:message="hintMessage"
			class="mt-1"
		/>
	</DraggableComparator>
</template>
