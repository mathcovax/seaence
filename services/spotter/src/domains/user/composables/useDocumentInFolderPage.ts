import type { DocumentInFolderPage, DocumentInFolderList } from "@/lib/horizon/types/documentInFolder";
import { documentInFolderRules } from "@vendors/entity-rules";

export function useDocumentInFolderPage(
	documentFolderId: string,
	whenFindError: () => void,
) {
	const { t: $t } = useI18n();
	const pageInformation = ref<DocumentInFolderPage | null>(null);
	const list = ref<DocumentInFolderList | null>(null);
	const defaultPage = 1;
	const pageOfList = ref(defaultPage);

	const { Form, check, formValue } = useFormBuilder(
		useMultiFieldLayout({
			name: useBaseLayout(
				textformField,
				{
					mandatory: true,
					defaultValue: "",
					schema: zod.string()
						.max(
							documentInFolderRules.name.maxLength,
							$t("formMessage.maxLength", { value: documentInFolderRules.name.maxLength }),
						),
				},
			),
		}),
	);

	function findMany() {
		return horizonClient
			.post(
				"/find-many-document-in-folder",
				{
					body: {
						page: pageOfList.value,
						documentFolderId,
						partialDocumentInFolderName: formValue.value.name,
					},
				},
			)
			.whenInformation(
				"documentInFolderList.found",
				({ body }) => {
					list.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function handleSearch() {
		const result = check();

		if (!result) {
			return;
		}

		pageOfList.value = defaultPage;

		return findMany();
	}

	watch(
		pageOfList,
		findMany,
	);

	function setPage(value: number) {
		pageOfList.value = value;
	}

	void horizonClient
		.post(
			"/document-in-folder-page",
			{
				body: {
					documentFolderId,
				},
			},
		)
		.whenInformation(
			"documentInFolderPage.found",
			({ body }) => {
				pageInformation.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	void findMany();

	return {
		documentInFolderList: list,
		documentInFolderPageInformation: pageInformation,
		documentInFolderPageOfList: pageOfList,
		documentInFolderSetPage: setPage,
		handleSearchDocumentInFolder: handleSearch,
		documentInFolderFindMany: findMany,
		SearchDocumentInFolderForm: Form,
	};
}
