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
}

defineProps<Props>();

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
		v-model:search-term="modelSearchTerm"
	/>
</template>
