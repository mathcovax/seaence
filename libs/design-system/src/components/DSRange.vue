<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
import { computed } from "vue";
import DSInput from "./ui/input/DSInput.vue";

interface Props {
	min: number;
	max: number;
}

defineProps<Props>();
const emit = defineEmits<{ commit: [value: RangeValues] }>();

interface RangeValues {
	from: number;
	to: number;
}

const modelValue = defineModel<RangeValues>(
	{ required: true },
);

const sliderValue = computed<[number, number]>({
	get() {
		return [modelValue.value.from, modelValue.value.to];
	},
	set([from, to]) {
		modelValue.value = {
			from,
			to,
		};
	},
});

function onCommit() {
	emit("commit", modelValue.value);
}
</script>

<template>
	<div class="flex flex-col gap-4 my-2">
		<SliderRoot
			v-model="sliderValue"
			class="relative flex items-center h-2 bg-input rounded-full"
			:min="min"
			:max="max"
			:step="1"
			@value-commit="onCommit"
			:min-steps-between-thumbs="0"
		>
			<SliderTrack class="relative grow rounded-full h-[4px]">
				<SliderRange class="absolute h-full bg-primary rounded-full" />
			</SliderTrack>

			<SliderThumb
				class="block w-5 h-5 bg-background border border-input rounded-full cursor-pointer shadow-md hover:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
				aria-label="Valeur minimale"
			/>

			<SliderThumb
				class="block w-5 h-5 bg-background border border-input rounded-full cursor-pointer shadow-md hover:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
				aria-label="Valeur maximale"
			/>
		</SliderRoot>

		<div class="flex justify-between items-center gap-2">
			<DSInput
				v-model.number="modelValue.from"
				type="number"
				:min="min"
				:max="max"
				class="w-20 text-center"
				aria-label="Valeur minimale saisie"
			/>

			<span>-</span>

			<DSInput
				v-model.number="modelValue.to"
				type="number"
				:min="min"
				:max="max"
				class="w-20 text-center"
				aria-label="Valeur maximale saisie"
			/>
		</div>
	</div>
</template>
