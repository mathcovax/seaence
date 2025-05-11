<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../lib/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
	class?: HTMLAttributes["class"];
	defaultValue?: string;
	modelValue?: string;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
}>();

const emits = defineEmits<(e: "update:modelValue", payload: string | number) => void>();

const modelValue = useVModel(props, "modelValue", emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>

<template>
	<div
		class="flex flex-col"
	>
		<textarea
			v-model="modelValue"
			data-slot="textarea"
			:class="cn('border-input placeholder:text-muted-foreground text-sm focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', props.class)"
			:placeholder="props.placeholder"
		/>

		<span
			:class="cn('text-xs text-right text-green-600', {
				'text-red-600': props.minLength && (modelValue?.length ?? 0) < props.minLength,
			})"
		>
			Nombre de caractères restants :
			{{ props.minLength && (modelValue?.length ?? 0) < props.minLength ? props.minLength - (modelValue?.length ?? 0) : 0 }}
		</span>
	</div>
</template>
