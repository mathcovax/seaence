import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useRenameFormDialog } from "../../../composables/useRenameFormDialog";
import { useSearchDocumentFolder } from "./useSearchDocumentFolder";
import { useCreateDocumentFolderFormDialog } from "../../../composables/useCreateDocumentFolderFormDialog";

export function usePage() {
	const router = useRouter();
	const { t } = useI18n();
	const { $pt } = documentFolderPage.use();

	const {
		FormDialog: RenameFormDialog,
		getSubmission: getRenameSubmission,
		formValue: renameFormValue,
	} = useRenameFormDialog({
		title: $pt("renameDialog.title"),
		label: $pt("renameDialog.label"),
	});
	const {
		ValidationDialog: DeleteDialog,
		getValidation: getDeleteValidation,
	} = useValidationDialog({
		title: $pt("removeDialog.title"),
		description: $pt("removeDialog.description"),
		acceptLabel: t("cta.validate"),
		rejectLabel: t("cta.refuse"),
		destructive: true,
	});
	const {
		CreateFormDialog,
		createDocumentFolder,
	} = useCreateDocumentFolderFormDialog(
		() => {
			page.trigger();
			searchDocumentFolder.reset();
		},
	);
	const searchDocumentFolder = useSearchDocumentFolder();

	const page = usePageDetails(
		() => ({}),
		() => horizonClient
			.post(
				"/document-folder-page",
				{
					disableAuthenticationRequiredManagement: true,
				},
			)
			.whenRequestError(() => void router.push(homePage.createTo()))
			.iWantInformation("documentFolderPage.found")
			.then(({ body }) => body),
	);

	function clickOnDocumentFolder({ id }: DocumentFolder) {
		void router.push(
			documentInFolderPage.createTo({
				params: {
					documentFolderId: id,
				},
			}),
		);
	}

	async function removeDocumentFolder({ id }: DocumentFolder) {
		const result = await getDeleteValidation();
		if (!result) {
			return;
		}

		void horizonClient
			.post(
				"/remove-document-folder",
				{
					body: {
						documentFolderId: id,
					},
				},
			)
			.whenInformation(
				"documentFolder.removed",
				() => {
					page.trigger();
					searchDocumentFolder.reset();
				},
			);
	}

	async function renameDocumentFolder({ id, name }: DocumentFolder) {
		renameFormValue.value = name;
		const result = await getRenameSubmission();

		if (!result) {
			return;
		}

		void horizonClient
			.post(
				"/rename-document-folder",
				{
					body: {
						documentFolderId: id,
						newDocumentFolderName: result,
					},
				},
			)
			.whenInformation(
				"documentFolder.renamed",
				() => {
					searchDocumentFolder.trigger();
				},
			);
	}

	return {
		Components: {
			CreateFormDialog,
			RenameFormDialog,
			DeleteDialog,
		},
		actions: {
			createDocumentFolder,
			clickOnDocumentFolder,
			removeDocumentFolder,
			renameDocumentFolder,
		},
		searchDocumentFolder,
		pageDetails: page.details,
	};
}
