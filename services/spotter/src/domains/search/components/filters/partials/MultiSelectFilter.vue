<script setup lang="ts" generic="GenericFacet extends Extract<Facet, { type: 'multiSelect' }>">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facet: GenericFacet;
}

defineProps<Props>();

const modelValue = defineModel<GenericFacet["values"][number]["value"][]>(
	{ required: true },
);
</script>

<template>
	<div>
		{{ $t(`search.facet.${facet.name}.label`) }}

		<DSMultiComboBox
			:items="facet.values"
			:label="(item) => `${item.value} ${item.quantity}`"
			v-model="modelValue"
		/>
	</div>
</template>
