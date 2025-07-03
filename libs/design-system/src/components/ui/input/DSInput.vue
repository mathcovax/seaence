<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "../../../lib/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes["class"];
	maxLength?: number;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const emits = defineEmits<{
	"update:modelValue": [value: string | number];
}>();

const modelValue = useVModel(props, "modelValue", emits, {
	passive: true,
	defaultValue: props.defaultValue,
});

defineExpose({
	focus() {
		inputRef.value?.focus();
	},
	inputRef,
});
</script>

<template>
	<input
		ref="inputRef"
		v-model="modelValue"
		:maxlength="maxLength"
		:class="cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
	>
</template>
