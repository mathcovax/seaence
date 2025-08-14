import { IgnoreTimeoutRequestError } from "@/lib/sentry/errors/ignoreTimeoutRequestError";
import { pausableWatch } from "@vueuse/core";

export interface SearchParams {
	term: string;
	page: number;
	abortController: AbortController;
}

export interface UseSearchOptions {
	immediate: boolean;
	debounceTime: number;
	term: string | Ref<string>;
	page: number | Ref<number>;
}

export function useSearch<
	GenericList extends Record<string, unknown>[],
	GenericDetails extends Record<string, unknown>,
>(
	fetchList: (params: SearchParams) => Promise<GenericList>,
	fetchDetails: (params: Pick<SearchParams, "term" | "abortController">) => Promise<GenericDetails>,
	options: UseSearchOptions,
) {
	const term = isRef(options.term)
		? options.term
		: ref(options.term);

	const page = isRef(options.page)
		? options.page
		: ref(options.page);

	const defaultTerm = term.value;
	const defaultPage = page.value;

	const list = ref<GenericList | null>(null);
	const details = ref<GenericDetails | null>(null);

	const fetchDebounce = createFetchDebounce(
		options.debounceTime,
		() => new IgnoreTimeoutRequestError("Abort fetch search."),
	);

	function findList(params: Pick<SearchParams, "page" | "term">) {
		fetchDebounce(
			(abortController) => fetchList({
				abortController,
				...params,
			}).then((result) => {
				list.value = result;
			}),
			"list",
		);
	}

	function findDetails(params: Pick<SearchParams, "term">) {
		fetchDebounce(
			(abortController) => fetchDetails({
				abortController,
				...params,
			}).then((result) => {
				details.value = result;
			}),
			"details",
		);
	}

	const listWatch = pausableWatch(
		[term, page],
		([term, page]) => {
			findList({
				term,
				page,
			});
		},
		{ immediate: options.immediate },
	);

	const detailsWatch = pausableWatch(
		term,
		(term) => {
			findDetails({
				term,
			});
		},
		{ immediate: options.immediate },
	);

	const data = computed(
		() => list.value && details.value
			? ({
				list: list.value as GenericList,
				details: details.value as GenericDetails,
			})
			: null,
	);

	function trigger() {
		findList({
			term: term.value,
			page: page.value,
		});
		findDetails({
			term: term.value,
		});
	}

	function reset() {
		listWatch.pause();
		detailsWatch.pause();
		page.value = defaultPage;
		term.value = defaultTerm;
		trigger();
		void nextTick()
			.then(() => {
				listWatch.resume();
				detailsWatch.resume();
			});
	}

	return {
		data,
		list,
		details,
		term,
		page,
		trigger,
		reset,
	};
}
