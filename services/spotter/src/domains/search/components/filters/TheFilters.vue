<script setup lang="ts">
import type { Facet, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { filterWrapper } from "./partials/filterWrapper";

interface Props {
	facets: Facet[];
}

defineProps<Props>();

const emit = defineEmits<{
	commitFiltersValue: [];
}>();

const filtersValues = defineModel<FiltersValues>(
	"filtersValues",
	{ required: true },
);

const {
	reset: resetChangeFiltersValues,
	hasChange: filtersValuesHasChange,
} = useRefHasChange(
	filtersValues,
	{ deep: true },
);

function getComponent(facet: Facet) {
	return filterWrapper(facet, filtersValues);
}

function commitFiltersValues() {
	resetChangeFiltersValues();
	emit("commitFiltersValue");
}

function resetFiltersValues() {
	filtersValues.value = {};
}

</script>

<template>
	<div
		class="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-inner"
	>
		<component
			v-for="facet of facets"
			:key="facet.name"
			:is="getComponent(facet)"
		/>

		<div class="flex flex-col-reverse md:flex-row gap-2 md:items-center justify-between pt-3 border-t border-gray-200">
			<DSButtonPrimary
				@click="commitFiltersValues"
				:disabled="!filtersValuesHasChange"
			>
				{{ $t("search.filters.apply") }}
			</DSButtonPrimary>

			<DSButtonOutline
				@click="resetFiltersValues"
			>
				{{ $t("search.filters.reset") }}
			</DSButtonOutline>
		</div>
	</div>
</template>
