<script setup lang="ts">
import { watchPausable } from "@vueuse/core";
import { useSearchPage } from "../composables/useSearchPage";
import SimpleSearchInput from "./SimpleSearchInput.vue";
import SearchResultWrapper from "./SearchResultWrapper.vue";
import SearchContainer from "./SearchContainer.vue";
import { convertQueryToSearchParams, convertSearchParamsToQuery } from "../utils/convertQuery";
import type { SearchParams } from "@/lib/horizon/types/search";
import AdvancedSearchInput from "./AdvancedSearchInput.vue";

const router = useRouter();
const route = useRoute();
const currentSearcghPage
	= route.name === simpleSearchPage.name
		? simpleSearchPage
		: advancedSearchPage;
const searchMode
	= route.name === simpleSearchPage.name
		? "simple"
		: "advanced";

const { $pt, query } = currentSearcghPage.use();
const { scrollToTop } = useScroll();
const sonner = useSonner();
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
	filtersValues: defaultPageSearchParams.filtersValues ?? {},
});
const isResultExpanded = ref(false);
const searchContainerRef = ref<InstanceType<typeof SearchContainer> | null>(null);
const maxBytesLength = 15000;

function submit(
	searchParams: SearchParams,
	searchDetails = true,
) {
	if (searchMode === "advanced") {
		const bytesLength = new Blob([JSON.stringify(searchParams)]).size;
		if (bytesLength > maxBytesLength) {
			sonner.sonnerError($pt("maxSizeRequest"));
			return;
		}
	}

	searchContainerRef.value?.toggle(false);

	queryWatcher.pause();

	void nextTick()
		.then(
			() => router
				.push(
					currentSearcghPage.createTo({
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

function commitSearchParams() {
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

if (route.query.term) {
	isResultExpanded.value = true;
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
			ref="searchContainerRef"
			:search-mode="searchMode"
			:is-expanded="isResultExpanded"
			:is-fetching="isFetching"
			:result="result"
			:total="result?.total"
			v-model:filters-values="searchParams.filtersValues"
			@commit-filters-values="commitSearchParams"
		>
			<SimpleSearchInput
				v-if="typeof searchParams.term === 'string'"
				class="w-full mx-4 max-w-150"
				v-model:language="searchParams.language"
				v-model="searchParams.term"
				:placeholder="$pt('searchInput.placeholder')"
				@submit="commitSearchParams"
			/>

			<AdvancedSearchInput
				v-else
				class="w-full"
				v-model:language="searchParams.language"
				v-model="searchParams.term"
				@submit="commitSearchParams"
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
