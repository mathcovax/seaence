<script setup lang="ts">
import type { FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { SearchResult } from "../composables/useSearchPage";
import TheFilters from "./filters/TheFilters.vue";
import type DSOpenTansition from "@vendors/design-system/components/DSOpenTansition.vue";

interface Props {
	searchMode: "simple" | "advanced";
	isExpanded: boolean;
	isFetching: boolean;
	result: SearchResult | null;
	total?: number;
}

const props = defineProps<Props>();

const dSOpenTansitionRef = ref<InstanceType<typeof DSOpenTansition> | null>(null);
const isFiltersVisible = ref(false);
const isScratchVisible = ref(props.searchMode === "advanced" && !props.isExpanded);
const { scrollToTop } = useScroll();
const filtersValues = defineModel<FiltersValues>(
	"filtersValues",
	{ required: true },
);

const emit = defineEmits<{
	commitFiltersValues: [];
}>();

function commitFiltersValues() {
	isFiltersVisible.value = false;
	emit("commitFiltersValues");
}

function toggleFilters() {
	if (!props.result) {
		return;
	}

	isFiltersVisible.value = !isFiltersVisible.value;

	if (isFiltersVisible.value) {
		scrollToTop();
	}
}

function toggleScratch() {
	if (!props.result) {
		return;
	}

	isScratchVisible.value = !isScratchVisible.value;

	if (isScratchVisible.value) {
		scrollToTop();
	}
}

defineExpose({
	toggle(state: boolean) {
		isFiltersVisible.value = state;
		if (props.searchMode === "advanced") {
			isScratchVisible.value = state;
		}
	},
});
</script>

<template>
	<div
		class="relative transition-all duration-1500 ease-in-out"
		:class="{
			'mt-[calc(25vh)] md:mt-[calc(35vh)]': !isExpanded && searchMode === 'simple',
			'mt-[calc(5vh)] md:mt-[calc(10vh)]': !isExpanded && searchMode === 'advanced',
			'sticky top-[var(--header-height)] z-10 bg-background rounded-md shadow-md': isExpanded,
			'!static': (isScratchVisible || isFiltersVisible),
		}"
	>
		<div
			class="w-full p-2 lg:p-4 flex flex-col justify-center items-center gap-8"
		>
			<template v-if="searchMode === 'simple'">
				<slot />
			</template>

			<div
				v-else
				class="w-full"
			>
				<DSOpenTansition
					ref="dSOpenTansitionRef"
					:visible="isScratchVisible"
					class="w-full duration-800"
				>
					<slot />
				</DSOpenTansition>
			</div>

			<div
				class="w-full flex gap-4 justify-between items-end transition-all duration-1500 flex-wrap"
				:class="{'opacity-0': !result || isFetching}"
			>
				<DSOutlineButton
					class="w-38"
					@click="toggleFilters"
				>
					<span>{{ isFiltersVisible ? $t("search.filters.hideFilters") : $t("search.filters.showFilters") }}</span>
				</DSOutlineButton>

				<DSPrimaryButton
					v-if="searchMode === 'advanced'"
					class="w-38"
					@click="toggleScratch"
				>
					{{ isScratchVisible ? $t("search.filters.hideScratch") : $t("search.filters.showScratch") }}
				</DSPrimaryButton>

				<span class="text-sm text-right text-muted-foreground lg:w-40 text-wrap">{{ $t("search.foundResults", { count: total ?? "" }) }}</span>
			</div>
		</div>

		<DSOpenTansition
			v-if="result"
			class="bg-background rounded-md shadow-md duration-500"
			:visible="isFiltersVisible"
		>
			<TheFilters
				:facets="result.facets"
				v-model:filters-values="filtersValues"
				@commit-filters-values="commitFiltersValues"
			/>
		</DSOpenTansition>
	</div>
</template>
