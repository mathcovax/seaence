<script setup lang="ts">
import { useSimpleSearchPage } from "../composables/useSimpleSearchPage";
import type { BakedDocumentLanguage, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import SimpleSearchInput from "../components/SimpleSearchInput.vue";
import SearchResultWrapper from "../components/SearchResultWrapper.vue";
import SearchContainer from "../components/SearchContainer.vue";

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
const filtersValues = ref<FiltersValues>({});
const isResultExpanded = ref(!!term.value);

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
		filtersValues: filtersValues.value,
	});

	isResultExpanded.value = true;
}

if (term.value) {
	onSubmit();
}

onMounted(() => {
	scrollToTop();
});

watch(
	filtersValues,
	() => void console.log(filtersValues.value),
	{ deep: true },
);

</script>

<template>
	<section class="flex flex-col items-stretch min-h-screen relative">
		<div
			v-if="isFetching"
			class="w-full h-full absolute top-0 left-0 z-20"
		/>

		<SearchContainer
			:is-expanded="isResultExpanded"
			:is-fetching="isFetching"
			:result="result"
			:total="result?.total"
			v-model:filters-values="filtersValues"
		>
			<SimpleSearchInput
				class="w-full mx-4 max-w-150"
				v-model:language="bakedDocumentLanguage"
				v-model="term"
				:placeholder="$pt('searchInput.placeholder')"
				@submit="onSubmit"
			/>
		</SearchContainer>

		<SearchResultWrapper
			:result="result"
			:is-fetching="isFetching"
			:page-of-baked-document-search-result="pageOfBakedDocumentSearchResult"
			@update-page="setPage"
		/>

		<DSSea :speed="isFetching" />
	</section>
</template>
