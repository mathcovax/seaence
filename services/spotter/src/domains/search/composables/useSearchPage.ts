import type { SearchDetails, SearchDetailsBody, SearchParams } from "@/lib/horizon/types/search";
import type { BakedDocumentSearchResult, Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export interface SearchResult {
	total: number;
	quantityPerPage: number;
	facets: Facet[];
	searchResults: BakedDocumentSearchResult[];
}

const smoothTimeEnabled = 400;

export function useSearchPage() {
	const { enable: fetchStart, isEnabled: isFetching, disable: fetchEnd } = useSmoothEnabled(smoothTimeEnabled);
	const sonner = useSonner();
	const { t } = useI18n();
	const searchDetails = ref<SearchDetails | null>(null);
	const bakedDocumentSearchResult = ref<BakedDocumentSearchResult[] | null>(null);

	function findSimpleSearchResult(query: SearchParams) {
		const enabledId = fetchStart();
		return horizonClient
			.post(
				"/search-results",
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
			.catch(() => sonner.sonnerError(t("search.failedToFetch")))
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
				"search.details",
				({ body }) => {
					searchDetails.value = body;
				},
			)
			.finally(() => void fetchEnd(enabledId));
	}

	function search(query: SearchParams, searchDetails = true) {
		return Promise
			.all([
				findSimpleSearchResult(query),
				searchDetails && findFacet({
					filtersValues: query.filtersValues,
					language: query.language,
					term: query.term,
				}),
			]);
	}

	const result = computed(
		(): SearchResult | null => searchDetails.value !== null
		&& bakedDocumentSearchResult.value !== null
			? {
				...searchDetails.value,
				searchResults: bakedDocumentSearchResult.value,
			}
			: null,
	);

	return {
		search,
		result,
		isFetching,
	};
}
