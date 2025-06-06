import type { ReportingBakedDocumentTranslationListRow } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { reportingBakedDocumentTranslationPage } from "../router";

export function useList() {
	const router = useRouter();
	const { query, params } = reportingBakedDocumentTranslationPage.use();

	const pageOfList = computed({
		get() {
			return query.value.page;
		},
		set(value) {
			void router.push(
				reportingBakedDocumentTranslationPage.createTo({
					params: { bakedDocumentId: params.value.bakedDocumentId },
					query: { page: value },
				}),
			);
		},
	});

	const defaultPage = 1;
	watch(
		() => params.value.bakedDocumentId,
		() => {
			pageOfList.value = defaultPage;
		},
	);
	const list = ref<ReportingBakedDocumentTranslationListRow[] | null>(null);

	watch(
		() => [pageOfList.value, params.value.bakedDocumentId] as const,
		([page, bakedDocumentId]) => {
			void bridgeClient
				.post(
					"/reporting-baked-document-translation-list",
					{
						body: {
							page,
							bakedDocumentId,
						},
					},
				)
				.whenInformation(
					"reportingDakedDocumentTranslationList.found",
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
