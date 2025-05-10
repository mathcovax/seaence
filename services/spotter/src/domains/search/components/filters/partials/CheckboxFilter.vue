<script setup lang="ts" generic="GenericFacet extends Extract<Facet, { type: 'checkbox' }>">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facet: GenericFacet;
}

defineProps<Props>();

const modelValue = defineModel<GenericFacet["values"][number]["value"][]>(
	{ required: true },
);

const indexNotFOund = -1;
const quantiyItemDelete = 1;

function toggleValue(selectedValue: GenericFacet["values"][number]["value"]) {
	const valueIndex = modelValue.value.findIndex(
		(value) => value === selectedValue,
	);

	if (valueIndex === indexNotFOund) {
		modelValue.value.push(selectedValue);
	} else {
		modelValue.value.splice(valueIndex, quantiyItemDelete);
	}

	modelValue.value = [...modelValue.value];
}

</script>

<template>
	<div
		v-if="facet.values.length"
		class="select-none"
	>
		{{ $t(`search.facet.${facet.name}.label`) }}
		<div>
			<div
				v-for="{value, quantity} of facet.values"
				:key="value"
				@click="toggleValue(value)"
			>
				<DSCheckbox
					:model-value="modelValue.includes(value)"
				/>
				{{ value }}
				{{ quantity }}
			</div>
		</div>
	</div>
</template>
