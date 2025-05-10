<script setup lang="ts">
import type { FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { SearchResult } from "../composables/useSimpleSearchPage";
import TheFilters from "./filters/TheFilters.vue";

interface Props {
	isExpanded: boolean;
	isFetching: boolean;
	result: SearchResult | null;
	total?: number;
}

defineProps<Props>();

const isFiltersVisible = ref(false);

const filtersValues = defineModel<FiltersValues>(
	"filtersValues",
	{ required: true },
);

const emit = defineEmits<{
	commitFiltersValue: [];
}>();

function commitFiltersValues() {
	emit("commitFiltersValue");
}
</script>

<template>
	<div
		class="relative transition-all duration-1500 ease-in-out"
		:class="{
			'mt-[calc(25vh)] md:mt-[calc(35vh)]': !isExpanded,
			'sticky top-24 z-10 bg-white rounded-md shadow-md': isExpanded
		}"
	>
		<div class="w-full p-4 flex flex-col justify-center gap-8 items-center">
			<slot />

			<div
				class="w-full flex gap-4 justify-between items-center transition-all duration-1500"
				:class="{'opacity-0': !result || isFetching}"
			>
				<DSButtonOutline
					@click="isFiltersVisible = !isFiltersVisible && !!result"
				>
					<span>{{ isFiltersVisible ? $t("search.filters.hideFilters") : $t("search.filters.showFilters") }}</span>
				</DSButtonOutline>

				<span class="text-sm text-right text-gray-500 flex items-center">{{ $t("search.foundResults", { count: total ?? "" }) }}</span>
			</div>
		</div>

		<div
			v-if="result"
			class="absolute bottom-4 w-full h-0"
		>
			<div
				class="max-h-0 overflow-hidden transition-all duration-500 px-4 bg-white rounded-md"
				:class="{'!max-h-200 shadow-md py-4': isFiltersVisible}"
			>
				<TheFilters
					:facets="result.facets"
					v-model:filters-values="filtersValues"
					@commit-filters-value="commitFiltersValues"
				/>
			</div>
		</div>
	</div>
</template>
