import type { DocumentFolderList, DocumentFolderPage } from "@/lib/horizon/types/documentFolder";
import { documentFolderRules } from "@vendors/entity-rules";

export function useDocumentFolderPage(
	whenFindError: () => void,
) {
	const { t: $t } = useI18n();

	const documentFolderPageInformation = ref<DocumentFolderPage | null>(null);
	const documentFolderList = ref<DocumentFolderList | null>(null);

	const defaultPage = 1;
	const pageOfList = ref(defaultPage);

	const { Form, check } = useFormBuilder(
		useMultiFieldLayout({
			name: useBaseLayout(
				textformField,
				{
					mandatory: true,
					defaultValue: "",
					schema: zod.string()
						.max(
							documentFolderRules.name.maxLength,
							$t("formMessage.maxLength", { value: documentFolderRules.name.maxLength }),
						),
				},
			),
		}),
	);

	function findDocumentFolder() {
		const result = check();

		if (!result) {
			return;
		}

		pageOfList.value = defaultPage;

		return horizonClient
			.post(
				"/find-many-document-folders",
				{
					body: {
						page: pageOfList.value,
						partialDocumentFolderName: result.name,
					},
				},
			)
			.whenInformation(
				"documentFolders.found",
				({ body }) => {
					documentFolderList.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	watch(
		pageOfList,
		findDocumentFolder,
	);

	function setPage(value: number) {
		pageOfList.value = value;
	}

	void horizonClient
		.post("/document-folder-page")
		.whenInformation(
			"documentFolderPage.found",
			({ body }) => {
				documentFolderPageInformation.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	return {
		documentFolderList,
		documentFolderPageInformation,
		pageOfList,
		setPage,
		findDocumentFolder,
		SearchDocumentFolderForm: Form,
	};
}
