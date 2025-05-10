<script setup lang="ts" generic="GenericFacet extends Extract<Facet, { type: 'range' }>">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facet: GenericFacet;
}

const props = defineProps<Props>();

interface Range {
	from: number;
	to: number;
}

const modelValue = defineModel<Range>(
	{ required: true },
);

const defaultValue = 0;

const firstIndex = 0;
const min = computed(
	() => props.facet.values[firstIndex]?.value ?? defaultValue,
);
const lastIndexoffset = 1;
const max = computed(
	() => props.facet.values[props.facet.values.length - lastIndexoffset]?.value ?? defaultValue,
);

const proxyModelValue = computed({
	get() {
		return {
			from: modelValue.value.from || min.value,
			to: modelValue.value.to || max.value,
		};
	},
	set(value) {
		modelValue.value = value;
	},
});

</script>

<template>
	<div>
		{{ $t(`search.facet.${facet.name}.label`) }}

		<DSRange
			:min="min"
			:max="max"
			v-model="proxyModelValue"
		/>
	</div>
</template>
