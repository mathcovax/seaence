import type { SearchDetailsBody, SimpleSearchResultBody } from "@/lib/horizon/types/search";
import type { BakedDocumentSearchResult, Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export interface SearchResult {
	total: number;
	quantityPerPage: number;
	facets: Facet[];
	searchResult: BakedDocumentSearchResult[];
}

const smoothTimeEnabled = 400;

export function useSearchPage() {
	const { enable: fetchStart, isEnabled: isFetching, disable: fetchEnd } = useSmoothEnabled(smoothTimeEnabled);
	const total = ref<number | null>(null);
	const quantityPerPage = ref<number | null>(null);
	const facets = ref<null | Facet[]>(null);
	const bakedDocumentSearchResult = ref<BakedDocumentSearchResult[] | null>(null);

	const defaultPage = 1;
	const pageOfBakedDocumentSearchResult = ref(defaultPage);

	function findSimpleSearchResult(query: SimpleSearchResultBody) {
		const enabledId = fetchStart();
		return horizonClient
			.post(
				"/simple-search-results",
				{
					body: query,
					disabledLoader: true,
				},
			)
			.whenInformation(
				"simpleSearch.results",
				({ body }) => {
					bakedDocumentSearchResult.value = body;
				},
			)
			.finally(() => void fetchEnd(enabledId));
	}

	function findFacet(query: SearchDetailsBody) {
		const enabledId = fetchStart();
		return horizonClient
			.post(
				"/search-details",
				{
					body: query,
					disabledLoader: true,
				},
			)
			.whenInformation(
				"facets.results",
				({ body }) => {
					total.value = body.total;
					facets.value = body.facets;
					quantityPerPage.value = body.quantityPerPage;
				},
			)
			.finally(() => void fetchEnd(enabledId));
	}

	let lastQuery: SimpleSearchResultBody | null = null;

	function search(query: SimpleSearchResultBody) {
		lastQuery = query;
		return Promise
			.all([
				findSimpleSearchResult(query),
				findFacet({
					filtersValues: query.filtersValues,
					language: query.language,
					term: query.term,
				}),
			]);
	}

	function setPage(page: number) {
		if (!lastQuery) {
			return;
		}

		pageOfBakedDocumentSearchResult.value = page;

		void findSimpleSearchResult({
			...lastQuery,
			page,
		});
	}

	const result = computed(
		() => total.value !== null
		&& facets.value !== null
		&& bakedDocumentSearchResult.value !== null
		&& quantityPerPage.value !== null
			? {
				total: total.value,
				facets: facets.value,
				searchResult: bakedDocumentSearchResult.value,
				quantityPerPage: quantityPerPage.value,
			}
			: null,
	);

	return {
		search,
		setPage,
		result,
		pageOfBakedDocumentSearchResult: computed(() => pageOfBakedDocumentSearchResult.value),
		isFetching,
	};
}
