<script setup lang="ts">
import DSSelect from "../ui/select/DSSelect.vue";

export interface SelectItem {
	value: string;
	label: string;
}

interface Props {
	placeholder: string;
	items: SelectItem[];
}

defineProps<Props>();

const modelValue = defineModel<SelectItem | null>({ required: true });

</script>

<template>
	<DSSelect
		class="w-full"
		v-model="modelValue"
		:items="items"
		:placeholder="placeholder"
		:label="({label}) => label"
	/>
</template>
