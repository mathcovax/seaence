import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useRenameFormDialog } from "../../../composables/useRenameFormDialog";
import { useSearchDocumentInFolder } from "./useSearchDocumentInFolder";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

export function usePage() {
	const { t } = useI18n();
	const { params, $pt } = documentInFolderPage.use();
	const router = useRouter();
	const { userNavigatorLanguage } = useUserInformation();

	const searchDocumentInFolder = useSearchDocumentInFolder();
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

	const page = usePageDetails(
		() => ({ documentFolderId: params.value.documentFolderId }),
		({ documentFolderId }) => horizonClient
			.post(
				"/document-in-folder-page",
				{
					body: {
						documentFolderId,
					},
					disableAuthenticationRequiredManagement: true,
				},
			)
			.whenRequestError(() => void router.push(homePage.createTo()))
			.iWantInformation("documentInFolderPage.found")
			.then(({ body }) => body),
	);

	function clickOnDocumentInFolder({ nodeSameRawDocumentId }: DocumentInFoloder) {
		void router.push(
			documentPage.createTo({
				params: {
					id: createBakedDocumentId({
						nodeSameRawDocumentId,
						bakedDocumentLanguage: userNavigatorLanguage.value,
					}),
				},
			}),
		);
	}

	async function removeDocumentInFolder({ documentFolderId, nodeSameRawDocumentId }: DocumentInFoloder) {
		const isValid = await getDeleteValidation();

		if (!isValid) {
			return;
		}

		void horizonClient
			.post(
				"/remove-document-in-folder",
				{
					body: {
						documentFolderId,
						nodeSameRawDocumentId,
					},
				},
			)
			.whenInformation(
				"documentInFolder.removed",
				() => {
					void page.trigger();
					void searchDocumentInFolder.reset();
				},
			);
	}

	async function renameDocumentInFolder({ documentFolderId, nodeSameRawDocumentId, name }: DocumentInFoloder) {
		renameFormValue.value = name;
		const result = await getRenameSubmission();

		if (!result) {
			return;
		}

		void horizonClient
			.post(
				"/rename-document-in-folder",
				{
					body: {
						documentFolderId,
						nodeSameRawDocumentId,
						newDocumentInFolderName: result,
					},
				},
			)
			.whenInformation(
				"documentInFolder.renamed",
				() => {
					searchDocumentInFolder.trigger();
				},
			);
	}

	return {
		Components: {
			DeleteDialog,
			RenameFormDialog,
		},
		actions: {
			clickOnDocumentInFolder,
			removeDocumentInFolder,
			renameDocumentInFolder,
		},
		searchDocumentInFolder,
		pageDetails: page.details,
	};
}
