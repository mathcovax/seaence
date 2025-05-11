<script setup lang="ts" generic="GenericFacet extends Extract<Facet, { type: 'multiSelect' }>">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facet: GenericFacet;
}

const props = defineProps<Props>();

const modelValue = defineModel<GenericFacet["values"][number]["value"][]>(
	{ required: true },
);

const defaultQuantity = 0;
const multiSelectValue = computed<GenericFacet["values"]>({
	get() {
		return modelValue.value.map(
			(value) => ({
				value,
				quantity: props.facet.values.find(
					(facetValue) => facetValue.value === value,
				)?.quantity ?? defaultQuantity,
			}),
		);
	},
	set(value) {
		modelValue.value = value.map(
			({ value }) => value,
		);
	},
});

</script>

<template>
	<div>
		{{ $t(`search.facet.${facet.name}.label`) }}

		<DSMultiComboBox
			:items="facet.values"
			:label="(item) => `${item.value} ${item.quantity}`"
			:value="(item) => item.value"
			:placeholder="$t('filter.multiSelect.placeholder')"
			:empty-label="$t('filter.multiSelect.emptyLabel')"
			v-model="multiSelectValue"
		/>
	</div>
</template>
