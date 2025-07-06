<script setup lang="ts">
import DSMultiComboBox from "../DSMultiComboBox.vue";

export interface MultiComboboxItem {
	label: string;
	value: string;
}

interface Props {
	items: MultiComboboxItem[];
	placeholder: string;
	emptyLabel: string;
	max?: number;
}

defineProps<Props>();

const emit = defineEmits<{
	focus: [];
}>();

const modelValue = defineModel<MultiComboboxItem[]>({
	required: true,
});

const modelSearchTerm = defineModel<string>(
	"searchTerm",
	{ default: "" },
);

</script>

<template>
	<DSMultiComboBox
		v-model="modelValue"
		:items="items"
		:placeholder="placeholder"
		:empty-label="emptyLabel"
		:label="({label}) => label"
		:value="({value}) => value"
		v-model:search-term="modelSearchTerm"
		:max="max"
		@focus="emit('focus')"
	/>
</template>
