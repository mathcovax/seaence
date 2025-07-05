import type {
	DocumentInFolderPage,
	DocumentInFolderList,
	DocumentInFolderListDetails,
} from "@/lib/horizon/types/documentInFolder";
import { documentInFolderRules } from "@vendors/entity-rules";

export function useDocumentInFolderPage(
	documentFolderId: string,
	whenFindError: () => void,
) {
	const { t: $t } = useI18n();
	const pageInformation = ref<DocumentInFolderPage | null>(null);
	const list = ref<DocumentInFolderList | null>(null);
	const listDetails = ref<DocumentInFolderListDetails | null>(null);
	const defaultPage = 1;
	const pageOfList = ref(defaultPage);

	const { Form, check, formValue } = useFormBuilder(
		useMultiFieldLayout({
			name: useBaseLayout(
				textFormField,
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
					disableAuthenticationRequiredManagement: true,
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

	function findManyDetails() {
		return horizonClient
			.post(
				"/find-many-document-in-folder-details",
				{
					body: {
						documentFolderId,
						partialDocumentInFolderName: formValue.value.name,
					},
					disableAuthenticationRequiredManagement: true,
				},
			)
			.whenInformation(
				"documentInFolderList.foundDetails",
				({ body }) => {
					listDetails.value = body;
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

	function init() {
		void horizonClient
			.post(
				"/document-in-folder-page",
				{
					body: {
						documentFolderId,
					},
					disableAuthenticationRequiredManagement: true,
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

		void findManyDetails();
	}

	void init();

	return {
		documentInFolderList: list,
		documentInFolderListDetails: listDetails,
		documentInFolderPageInformation: pageInformation,
		documentInFolderPageOfList: pageOfList,
		documentInFolderSetPage: setPage,
		handleSearchDocumentInFolder: handleSearch,
		documentInFolderFindMany: findMany,
		documentInFolderFindManyDetails: findManyDetails,
		initDocumentInFolderPage: init,
		SearchDocumentInFolderForm: Form,
	};
}
