import type { DocumentFolderList, DocumentFolderPage } from "@/lib/horizon/types/documentFolder";
import { documentFolderRules } from "@vendors/entity-rules";

export function useDocumentFolderPage(
	whenFindError: () => void,
) {
	const { t: $t } = useI18n();

	const pageInformation = ref<DocumentFolderPage | null>(null);
	const list = ref<DocumentFolderList | null>(null);

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
							documentFolderRules.name.maxLength,
							$t("formMessage.maxLength", { value: documentFolderRules.name.maxLength }),
						),
				},
			),
		}),
	);

	function findMany() {
		return horizonClient
			.post(
				"/find-many-document-folders",
				{
					body: {
						page: pageOfList.value,
						partialDocumentFolderName: formValue.value.name,
					},
				},
			)
			.whenInformation(
				"documentFolders.found",
				({ body }) => {
					list.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function handleSearchDocumentFolderByName() {
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
		.post("/document-folder-page")
		.whenInformation(
			"documentFolderPage.found",
			({ body }) => {
				pageInformation.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	void findMany();

	return {
		documentFolderList: list,
		documentFolderPageInformation: pageInformation,
		documentFolderPageOfList: pageOfList,
		documentFolderSetPage: setPage,
		handleSearchDocumentFolderByName,
		findManyDocumentFolder: findMany,
		SearchDocumentFolderForm: Form,
	};
}
