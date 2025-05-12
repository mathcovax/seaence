<script setup lang="ts">
import { useSearchPage } from "../composables/useSearchPage";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import SimpleSearchInput from "../components/SimpleSearchInput.vue";
import SearchResultWrapper from "../components/SearchResultWrapper.vue";
import SearchContainer from "../components/SearchContainer.vue";
import { convertFiltersToQuery, convertQueryTofilter } from "../utils/convertQueryTofilter";

const router = useRouter();
const { $pt, query } = simpleSearchPage.use();
const { scrollToTop } = useScroll();
const {
	search,
	setPage,
	result,
	pageOfBakedDocumentSearchResult,
	isFetching,
} = useSearchPage();

const bakedDocumentLanguage = ref<BakedDocumentLanguage>(query.value.language);
const term = ref(query.value.term);

const filtersValues = ref(
	convertQueryTofilter(query.value),
);
const isResultExpanded = ref(!!term.value);

function onSubmit() {
	void router.push(
		simpleSearchPage.createTo({
			query: {
				term: term.value,
				language: bakedDocumentLanguage.value,
				...convertFiltersToQuery(filtersValues.value),
			},
		}),
	);

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

watch(
	query,
	() => {
		const newfilter = convertQueryTofilter(query.value);

		if (JSON.stringify(newfilter) !== JSON.stringify(filtersValues.value)) {
			filtersValues.value = newfilter;
			onSubmit();
		}
	},
);

onMounted(() => {
	scrollToTop();
});
</script>

<template>
	<section class="relative min-h-screen-nh flex flex-col items-stretch">
		<div
			v-if="isFetching"
			class="w-full h-full absolute top-0 left-0 z-20"
		/>

		<SearchContainer
			search-mode="simple"
			:is-expanded="isResultExpanded"
			:is-fetching="isFetching"
			:result="result"
			:total="result?.total"
			v-model:filters-values="filtersValues"
			@commit-filters-values="onSubmit"
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
