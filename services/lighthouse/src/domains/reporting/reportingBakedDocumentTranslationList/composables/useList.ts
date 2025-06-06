import type {
	ReportingBakedDocumentTranslationAggregateListRow,
} from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { reportingBakedDocumentTranslationListPage } from "../router";

export function useList() {
	const router = useRouter();
	const { query } = reportingBakedDocumentTranslationListPage.use();

	const pageOfList = computed({
		get() {
			return query.value.page;
		},
		set(value) {
			void router.push(
				reportingBakedDocumentTranslationListPage.createTo({
					query: { page: value },
				}),
			);
		},
	});
	const list = ref<ReportingBakedDocumentTranslationAggregateListRow[] | null>(null);

	watch(
		pageOfList,
		(page) => {
			void bridgeClient
				.post(
					"/reporting-baked-document-translation-aggregate-list",
					{ body: { page } },
				)
				.whenInformation(
					"reportingBakeDocumentTranslationAggregateList.found",
					({ body }) => {
						list.value = body;
					},
				);
		},
		{ immediate: true },
	);

	return {
		pageOfList,
		list,
	};
}
