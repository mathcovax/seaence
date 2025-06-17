<script setup lang="ts">
import DSSelect from "../ui/select/DSSelect.vue";

interface Props {
	placeholder: string;
	items: string[];
}

defineProps<Props>();

const modelValue = defineModel<string | null>({ required: true });

</script>

<template>
	<DSSelect
		class="w-full"
		v-model="modelValue"
		:items="items"
		:placeholder="placeholder"
	/>
</template>
