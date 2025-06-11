<script setup lang="ts">
import {
	providerEnum,
	comparatorProviderConfig,
	type ComparatorProvider,
} from "@vendors/types-advanced-query";
import DraggableComparator from "./DraggableComparator.vue";
import ScratchHint from "../ScratchHint.vue";
import { useHintMessage } from "../../composables/useHintMessage";

const emit = defineEmits<{ remove: [] }>();
const model = defineModel<ComparatorProvider>({ required: true });
const { t } = useI18n();

const textFieldSchema = zod
	.any()
	.array()
	.min(
		comparatorProviderConfig.minContent,
		{ message: t("formMessage.minItems", { value: comparatorProviderConfig.minContent }) },
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
			<span class="font-medium text-sm">{{ $t('search.scratch.comparator.provider.label') }}</span>

			<DSButtonIcon
				variant="ghost"
				size="sm"
				@click="emit('remove')"
				class="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
			>
				<DSIcon name="close" />
			</DSButtonIcon>
		</div>

		<div class="grid grid-cols-1">
			<DSMultiComboBox
				:empty-label="$t('search.scratch.comparator.provider.emptyLabel')"
				:items="providerEnum.toTuple()"
				:label="(item) => $t(`search.scratch.comparator.provider.value.${item}`) || item"
				:placeholder="$t('search.scratch.comparator.provider.selectPlaceholder')"
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
