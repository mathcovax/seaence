<script setup lang="ts">
import TheFilters from "./TheFilters.vue";

interface Props {
	isExpanded: boolean;
	isFetching: boolean;
	hasResult: boolean;
	total?: number;
}

defineProps<Props>();

const isFiltersVisible = ref(false);
</script>

<template>
	<div
		class="relative transition-all duration-1500 ease-in-out"
		:class="{
			'mt-[calc(35vh)]': !isExpanded,
			'sticky top-24 z-10 bg-white rounded-md shadow-md': isExpanded
		}"
	>
		<div class="w-full p-4 flex flex-col justify-center gap-8 items-center">
			<slot />

			<div
				class="w-full flex gap-4 justify-between items-center transition-all duration-1500"
				:class="{'opacity-0': !hasResult || isFetching}"
			>
				<DSButtonOutline
					@click="isFiltersVisible = !isFiltersVisible"
				>
					<span>{{ isFiltersVisible ? $t("search.filters.hideFilters") : $t("search.filters.showFilters") }}</span>
				</DSButtonOutline>

				<span class="text-sm text-right text-gray-500 flex items-center">{{ $t("search.foundResults", { count: total ?? "" }) }}</span>
			</div>
		</div>

		<div
			class="absolute bottom-4 w-full h-0"
		>
			<div
				class="max-h-0 overflow-hidden transition-all duration-500 px-4 bg-white rounded-md"
				:class="{'!max-h-200 shadow-md py-4': isFiltersVisible}"
			>
				<TheFilters :is-filters-visible="isFiltersVisible" />
			</div>
		</div>
	</div>
</template>
