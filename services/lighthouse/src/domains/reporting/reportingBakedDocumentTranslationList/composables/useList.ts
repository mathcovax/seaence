import type { ReportingBakedDocumentTranslationRow } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
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
	const list = ref<ReportingBakedDocumentTranslationRow[] | null>(null);

	watch(
		pageOfList,
		(page) => {
			void bridgeClient
				.post(
					"/reporting-baked-document-translation-list",
					{ body: { page } },
				)
				.whenInformation(
					"reportingBakeDocumentTranslationList.found",
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
