<script setup lang="ts" generic="GenericFacet extends Extract<Facet, { type: 'multiSelect' }>">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facet: GenericFacet;
}

const props = defineProps<Props>();
const { t } = useI18n();
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

function label(item: GenericFacet["values"][number]) {
	const label = t(`search.facet.${props.facet.name}.valueLabel.${item.value}`);

	return `${label} ${item.quantity}`;
}

</script>

<template>
	<div class="flex flex-col gap-2">
		<DSLabel class="text-sm font-medium">
			{{ $t(`search.facet.${facet.name}.label`) }}
		</DSLabel>

		<DSMultiComboBox
			:items="facet.values"
			:label="label"
			:value="(item) => item.value"
			:placeholder="$t(`search.filters.multiSelect.${facet.name}.placeholder`)"
			:empty-label="$t(`search.filters.multiSelect.${facet.name}.emptyLabel`)"
			v-model="multiSelectValue"
		/>
	</div>
</template>
