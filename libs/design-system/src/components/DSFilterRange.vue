<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
import { reactive, ref, watch } from "vue";
import DSInput from "./ui/input/DSInput.vue";

interface Props {
	name: string;
	min: number;
	max: number;
}

const RANGE_VARS = {
	FIRST_INDEX: 0,
	SECOND_INDEX: 1,
};

const props = defineProps<Props>();
const sliderValue = ref<[number, number]>([props.min, props.max]);
const limits = reactive({
	max: props.max,
	min: props.min,
});

const filterValue = defineModel<[number, number] | undefined>(
	"filterValue",
	{ required: true },
);

function commit() {
	const val1 = Math.max(limits.min, Math.min(limits.max, sliderValue.value[RANGE_VARS.FIRST_INDEX]));
	const val2 = Math.max(val1, Math.min(limits.max, sliderValue.value[RANGE_VARS.SECOND_INDEX]));

	sliderValue.value = [val1, val2];
	filterValue.value = [
		sliderValue.value[RANGE_VARS.FIRST_INDEX],
		sliderValue.value[RANGE_VARS.SECOND_INDEX],
	];
}

watch(
	filterValue,
	(newValue) => {
		const val1 = newValue?.[RANGE_VARS.FIRST_INDEX] ?? props.min;
		const val2 = newValue?.[RANGE_VARS.SECOND_INDEX] ?? props.max;

		sliderValue.value = [
			Math.max(limits.min, Math.min(limits.max, val1)),
			Math.max(limits.min, Math.min(limits.max, val2)),
		];
	},
	{ immediate: true },
);

watch(sliderValue, (newValue, oldValue) => {
	let [newVal1, newVal2] = newValue;

	if (newVal1 < limits.min) {
		newVal1 = limits.min;
	}
	if (newVal1 > limits.max) {
		newVal1 = limits.max;
	}
	if (newVal2 < limits.min) {
		newVal2 = limits.min;
	}
	if (newVal2 > limits.max) {
		newVal2 = limits.max;
	}

	if (newVal1 > newVal2) {
		const oldVal1 = oldValue?.[RANGE_VARS.FIRST_INDEX];
		if (newVal1 !== oldVal1) {
			newVal2 = newVal1;
		} else {
			newVal1 = newVal2;
		}
	}
}, { deep: true });

</script>

<template>
	<div class="flex flex-col gap-4 my-2">
		<SliderRoot
			v-model="sliderValue"
			class="relative flex items-center h-2 bg-gray-200 rounded-full"
			:min="limits.min"
			:max="limits.max"
			@value-commit="commit"
			:step="1"
			:min-steps-between-thumbs="0"
		>
			<SliderTrack class="relative grow rounded-full h-[4px]">
				<SliderRange class="absolute h-full bg-primary rounded-full" />
			</SliderTrack>

			<SliderThumb
				class="block w-5 h-5 bg-white border border-gray-200 rounded-full cursor-pointer shadow-md hover:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
				aria-label="Valeur minimale"
			/>

			<SliderThumb
				class="block w-5 h-5 bg-white border border-gray-200 rounded-full cursor-pointer shadow-md hover:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
				aria-label="Valeur maximale"
			/>
		</SliderRoot>

		<div class="flex justify-between items-center gap-2">
			<DSInput
				v-model.number="sliderValue[RANGE_VARS.FIRST_INDEX]"
				type="number"
				:min="limits.min"
				:max="limits.max"
				class="w-20 text-center"
				aria-label="Valeur minimale saisie"
			/>

			<span>-</span>

			<DSInput
				v-model.number="sliderValue[RANGE_VARS.SECOND_INDEX]"
				type="number"
				:min="limits.min"
				:max="limits.max"
				class="w-20 text-center"
				aria-label="Valeur maximale saisie"
			/>
		</div>
	</div>
</template>
