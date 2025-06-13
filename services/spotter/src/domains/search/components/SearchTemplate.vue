<script setup lang="ts">
import { watchPausable } from "@vueuse/core";
import { useSearchPage } from "../composables/useSearchPage";
import SearchResultWrapper from "./SearchResultWrapper.vue";
import SearchContainer from "./SearchContainer.vue";
import { convertQueryToSearchParams, convertSearchParamsToQuery } from "../utils/convertQuery";
import type { SearchParams } from "@/lib/horizon/types/search";
import SimpleSearchInput from "./SimpleSearchInput.vue";
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

interface ReactiveSearchParams extends Omit<Required<SearchParams>, "term"> {
	term: SearchParams["term"] | null;
}

const searchParams = reactive<ReactiveSearchParams>({
	...defaultPageSearchParams,
	filtersValues: defaultPageSearchParams.filtersValues ?? {},
});
const isResultExpanded = ref(false);
const searchContainerRef = ref<InstanceType<typeof SearchContainer> | null>(null);
const advancedSearchInput = ref<InstanceType<typeof AdvancedSearchInput> | null>(null);
const maxBytesLength = 15000;

async function submit(
	reactiveSearchParams: ReactiveSearchParams,
	searchDetails = true,
) {
	await nextTick();

	if (
		!reactiveSearchParams.term
		|| (searchMode === "advanced" && !advancedSearchInput.value?.checkFields())
	) {
		return <const>"wrongField";
	}

	const searchParams = {
		...reactiveSearchParams,
		term: reactiveSearchParams.term,
	};

	if (searchMode === "advanced") {
		const bytesLength = new Blob([JSON.stringify(searchParams)]).size;
		if (bytesLength > maxBytesLength) {
			sonner.sonnerError($pt("maxSizeRequest"));
			return <const>"tooLargeField";
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
	void submit(searchParams);
}

function setPage(page: number) {
	searchParams.page = page;
	void submit(searchParams, false);
}

async function submitWithHandleWrongField(
	reactiveSearchParams: ReactiveSearchParams,
	searchDetails = true,
) {
	const result = await submit(reactiveSearchParams, searchDetails);

	if (result === "wrongField") {
		void router.push(
			currentSearcghPage.createTo({
				query: {},
			}),
		);

		searchContainerRef.value?.toggleFilters(false);
		searchContainerRef.value?.toggleSearch(true);
	}
}

const queryWatcher = watchPausable(
	query,
	() => {
		const newSearchParams = convertQueryToSearchParams(currentSearcghPage, query.value);
		searchParams.filtersValues = newSearchParams.filtersValues;
		searchParams.language = newSearchParams.language;
		searchParams.page = newSearchParams.page;
		searchParams.term = newSearchParams.term;
		void submitWithHandleWrongField(searchParams);
	},
);

if (route.query.term) {
	isResultExpanded.value = true;
}

onMounted(() => {
	scrollToTop();

	if (route.query.term) {
		void submitWithHandleWrongField(searchParams);
	}
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
				ref="advancedSearchInput"
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
