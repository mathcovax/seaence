import type {
	DocumentFolderList,
	DocumentFolderListDetails,
	DocumentFolderPage,
} from "@/lib/horizon/types/documentFolder";
import { documentFolderRules } from "@vendors/entity-rules";

export function useDocumentFolderPage(
	whenFindError: () => void,
) {
	const { t: $t } = useI18n();
	const pageInformation = ref<DocumentFolderPage | null>(null);
	const list = ref<DocumentFolderList | null>(null);
	const listDetails = ref<DocumentFolderListDetails | null>(null);
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
				"/find-many-document-folder",
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

	function findManyDetails() {
		return horizonClient
			.post(
				"/find-many-document-folder-details",
				{
					body: {
						partialDocumentFolderName: formValue.value.name,
					},
				},
			)
			.whenInformation(
				"documentFolders.foundDetails",
				({ body }) => {
					listDetails.value = body;
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

		void Promise.all([findMany(), findManyDetails()]);
	}

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

	void Promise.all([findMany(), findManyDetails()]);

	watch(
		pageOfList,
		findMany,
	);

	return {
		documentFolderList: list,
		documentFolderListDetails: listDetails,
		documentFolderPageInformation: pageInformation,
		documentFolderPageOfList: pageOfList,
		documentFolderSetPage: setPage,
		handleSearchDocumentFolderByName,
		findManyDocumentFolder: findMany,
		findManyDocumentFolderDetails: findManyDetails,
		SearchDocumentFolderForm: Form,
	};
}
