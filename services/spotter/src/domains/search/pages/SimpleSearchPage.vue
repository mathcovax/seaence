<script setup lang="ts">
import TheFilters from "../components/TheFilters.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";
import { useSimpleSearchPage } from "../composables/useSimpleSearchPage";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import SimpleSearchInput from "../components/SimpleSearchInput.vue";

const { $pt, goTo, query } = simpleSearchPage.use();
const { scrollToTop } = useScroll();
const {
	search,
	setPage,
	result,
	pageOfBakedDocumentSearchResult,
	isFetching,
} = useSimpleSearchPage();

const bakedDocumentLanguage = ref<BakedDocumentLanguage>(query.value.language);
const term = ref(query.value.term);

const isResultExpanded = ref(!!term.value);
const isFiltersVisible = ref(false);

function onSubmit() {
	void goTo({
		query: {
			term: term.value,
			language: bakedDocumentLanguage.value,
		},
	});

	void search({
		language: bakedDocumentLanguage.value,
		page: pageOfBakedDocumentSearchResult.value,
		term: term.value,
	});

	isResultExpanded.value = true;
}

if (term.value) {
	onSubmit();
}

onMounted(() => {
	scrollToTop();
});

</script>

<template>
	<section class="flex flex-col items-stretch min-h-screen relative">
		<div
			v-if="isFetching"
			class="w-full h-full absolute top-0 left-0 z-20"
		/>

		<div
			class="min-h-32 py-6 flex flex-col justify-center gap-8 items-center transition-all duration-1500 ease-in-out"
			:class="{
				'mt-[calc(35vh)]': !isResultExpanded,
				'sticky top-24 z-10 bg-white rounded-md shadow-md': isResultExpanded
			}"
		>
			<SimpleSearchInput
				class="w-150"
				v-model:language="bakedDocumentLanguage"
				v-model="term"
				:placeholder="$pt('searchInput.placeholder')"
				@submit="onSubmit"
			/>

			<div
				class="w-full transition-all duration-1500"
				:class="{'opacity-0': !result || isFetching}"
			>
				<div class="flex justify-between items-center px-6">
					<DSButtonOutline
						@click="isFiltersVisible = !isFiltersVisible"
					>
						<span>{{ isFiltersVisible ? $pt("hideFilters") : $pt("showFilters") }}</span>
					</DSButtonOutline>

					<span class="text-sm text-gray-500 flex items-center">{{ $pt("foundResults", { count: result?.total ?? "" }) }}</span>
				</div>

				<div
					class="h-0"
				>
					<div
						class="max-h-0 overflow-hidden transition-all duration-500 px-6 bg-white rounded-md"
						:class="{'!max-h-200 shadow-md py-6': isFiltersVisible}"
					>
						<TheFilters :is-filters-visible="isFiltersVisible" />
					</div>
				</div>
			</div>
		</div>

		<div
			class="duration-1500 transition-all ease-in pb-10"
			:class="{
				'opacity-0': !result || isFetching
			}"
		>
			<div
				v-if="result && result.searchResult.length > 0"
				class="bg-white flex flex-col items-stretch rounded-b-xl"
			>
				<DSPagination
					:total="result.total"
					:current-page="pageOfBakedDocumentSearchResult"
					:quantity-per-page="result.quantityPerPage"
					@update="setPage"
				/>

				<div class="w-full max-w-5xl mx-auto">
					<DocumentResultRow
						v-for="document in result.searchResult"
						:key="document.bakedDocumentId"
						:document="document"
					/>
				</div>

				<DSPagination
					:total="result.total"
					:current-page="pageOfBakedDocumentSearchResult"
					:quantity-per-page="result.quantityPerPage"
					@update="setPage"
				/>
			</div>

			<div
				v-else-if="result"
				class="grow flex items-center justify-center mt-20"
			>
				<p class="text-2xl text-gray-500">
					{{ $pt("noResults") }}
				</p>
			</div>
		</div>

		<DSSea :speed="isFetching" />
	</section>
</template>
