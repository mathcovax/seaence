<script setup lang="ts">
import DSCheckbox from "../ui/checkbox/DSCheckbox.vue";
import DSLabel from "../ui/label/DSLabel.vue";
import { useId } from "vue";

interface Props {
	label: string;
}

defineProps<Props>();

const modelValue = defineModel<boolean>({ required: true });
const checkboxId = useId();
</script>

<template>
	<div class="flex gap-2 items-center">
		<DSCheckbox
			v-model="modelValue"
			:id="checkboxId"
		/>

		<DSLabel
			:for="checkboxId"
			class="cursor-pointer"
		>
			{{ label }}
		</DSLabel>
	</div>
</template>
