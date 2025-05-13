<script setup lang="ts">
import { watchPausable } from "@vueuse/core";
import { useSearchPage } from "../composables/useSearchPage";
import SimpleSearchInput from "../components/SimpleSearchInput.vue";
import SearchResultWrapper from "../components/SearchResultWrapper.vue";
import SearchContainer from "../components/SearchContainer.vue";
import { convertQueryToSearchParams, convertSearchParamsToQuery } from "../utils/convertQuery";
import type { SearchParams } from "@/lib/horizon/types/search";

const router = useRouter();
const route = useRoute();
const currentSearcghPage
	= route.name === simpleSearchPage.name
		? simpleSearchPage
		: advancedSearchPage;

const { $pt, query } = currentSearcghPage.use();
const { scrollToTop } = useScroll();
const {
	search,
	result,
	isFetching,
} = useSearchPage();

const defaultPage = 1;
const defaultPageSearchParams = convertQueryToSearchParams(
	currentSearcghPage,
	query.value,
);
const searchParams = reactive({
	...defaultPageSearchParams,
	term: route.name === simpleSearchPage.name
		? defaultPageSearchParams.term
		: "",
	filtersValues: defaultPageSearchParams.filtersValues ?? {},
});
const isResultExpanded = ref(!!searchParams.term);

function submit(
	searchParams: SearchParams,
	searchDetails = true,
) {
	queryWatcher.pause();

	void nextTick()
		.then(
			() => router
				.push(
					simpleSearchPage.createTo({
						query: convertSearchParamsToQuery(searchParams),
					}),
				),
		)
		.finally(queryWatcher.resume);

	void search(
		searchParams,
		searchDetails,
	);

	isResultExpanded.value = true;
}

function commitParams() {
	searchParams.page = defaultPage;
	submit(searchParams);
}

function setPage(page: number) {
	searchParams.page = page;
	submit(searchParams, false);
}

const queryWatcher = watchPausable(
	query,
	() => {
		const newSearchParams = convertQueryToSearchParams(currentSearcghPage, query.value);
		searchParams.filtersValues = newSearchParams.filtersValues;
		searchParams.language = newSearchParams.language;
		searchParams.page = newSearchParams.page;
		searchParams.term = newSearchParams.term;
		void submit(searchParams);
	},
);

if (searchParams.term) {
	submit(searchParams);
}

onMounted(() => {
	scrollToTop();
});
</script>

<template>
	<section class="min-h-screen-nh flex flex-col items-stretch">
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
			v-model:filters-values="searchParams.filtersValues"
			@commit-filters-values="commitParams"
		>
			<SimpleSearchInput
				v-if="typeof searchParams.term === 'string'"
				class="w-full mx-4 max-w-150"
				v-model:language="searchParams.language"
				v-model="searchParams.term"
				:placeholder="$pt('searchInput.placeholder')"
				@submit="commitParams"
			/>
		</SearchContainer>

		<SearchResultWrapper
			:result="result"
			:is-fetching="isFetching"
			:current-page="searchParams.page"
			@update-page="setPage"
		/>

		<DSSea :speed="isFetching" />
	</section>
</template>
