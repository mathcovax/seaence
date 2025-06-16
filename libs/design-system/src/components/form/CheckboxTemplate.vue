<script setup lang="ts">
import DSCheckbox from "../ui/checkbox/DSCheckbox.vue";
import DSLabel from "../ui/label/DSLabel.vue";

interface Props {
	label: string;
}

defineProps<Props>();

const modelValue = defineModel<boolean>({ required: true });
</script>

<template>
	<div class="flex gap-2 items-center">
		<DSCheckbox v-model="modelValue" />

		<DSLabel>
			{{ label }}
		</DSLabel>
	</div>
</template>
