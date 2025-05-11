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
		class="flex flex-col gap-2 select-none"
	>
		<DSLabel class="text-sm font-medium">
			{{ $t(`search.facet.${facet.name}.label`) }}
		</DSLabel>

		<div>
			<div
				v-for="{value, quantity} of facet.values"
				:key="value"
				@click="toggleValue(value)"
				class="flex gap-2 items-center"
			>
				<DSCheckbox
					:model-value="modelValue.includes(value)"
				/>
				{{ value }}
				({{ quantity }})
			</div>
		</div>
	</div>
</template>
