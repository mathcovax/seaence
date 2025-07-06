import type {
	DocumentFolderInWhichDocumentExistList,
	DocumentFolderInWhichDocumentExistListDetails,
	DocumentFolderDialog,
} from "@/lib/horizon/types/documentFolder";
import { IgnoreTimeoutRequestError } from "@/lib/sentry/errors/ignoreTimeoutRequestError";
import { type MultiComboboxItem } from "@vendors/design-system/components/form/MultiComboboxTemplate.vue";
import { documentInFolderRules } from "@vendors/entity-rules";

const defaultPage = 1;

const minSelectFolder = 1;
const maxSelectFolder = 5;

const folderItemSchema = zod.object({
	label: zod.string(),
	value: zod.string(),
});

const debunceTime = 500;
const debounce = createFetchDebounce(
	debunceTime,
	() => new IgnoreTimeoutRequestError(),
);

const { sonnerMessage, sonnerWarning } = useSonner();

export function useCreateManyDocumentInFolderDialog(
	nodeSameRawDocumentId: string,
	currentDocumentTitle: string,
) {
	const { t } = useI18n();

	const itemsOfInputFolder = ref<MultiComboboxItem[]>([]);
	const documentFoldersInWhichDocumentExistList = ref<DocumentFolderInWhichDocumentExistList | null>(null);
	const documentFoldersInWhichDocumentExistListDetails = ref<
		DocumentFolderInWhichDocumentExistListDetails | null
	>(null);
	const pageOfListDocumentFoldersInWhichDocumentExist = ref(defaultPage);
	const dialogInformation = ref<DocumentFolderDialog | null>(null);

	const { Form, check, reset } = useFormBuilder(
		useMultiFieldLayout({
			name: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: t("createManyDocumentInFolderDialog.form.label.name"),
					schema: zod.string()
						.min(
							documentInFolderRules.name.minLength,
							t("formMessage.minLength", { value: documentInFolderRules.name.minLength }),
						)
						.max(
							documentInFolderRules.name.maxLength,
							t("formMessage.maxLength", { value: documentInFolderRules.name.maxLength }),
						),
					defaultValue: currentDocumentTitle,
				},
			),
			folder: useCheckLayout(
				multiComboBoxFormField,
				{
					mandatory: true,
					label: t("createManyDocumentInFolderDialog.form.label.folder"),
					schema: folderItemSchema
						.array()
						.min(minSelectFolder, t("formMessage.minLength", { value: minSelectFolder }))
						.max(maxSelectFolder, t("formMessage.minLength", { value: maxSelectFolder })),
					props: computed(() => ({
						items: itemsOfInputFolder.value,
						placeholder: t("createManyDocumentInFolderDialog.form.placeholder.folder"),
						emptyLabel: t("createManyDocumentInFolderDialog.form.emptyLabel.folder"),
						"onUpdate:searchTerm": findManyDocumentFolderByName,
						onFocus: findManyDocumentFolderByName,
						max: maxSelectFolder,
					})),
				},
			),
		}),
	);

	function findDilagInformation() {
		return horizonClient
			.post(
				"/document-folder-dialog",
			)
			.whenInformation(
				"documentFolderDialog.found",
				({ body }) => {
					dialogInformation.value = body;
				},
			);
	}

	function findManyDocumentFolderByName(
		name = "",
		page = defaultPage,
	) {
		debounce(
			(abortController) => horizonClient
				.post(
					"/find-many-document-folder",
					{
						body: {
							page,
							partialDocumentFolderName: name,
						},
						disabledLoader: true,
						signal: abortController.signal,
					},
				)
				.whenInformation(
					"documentFolders.found",
					({ body }) => {
						itemsOfInputFolder.value = body
							.map(
								(item) => ({
									label: item.name,
									value: item.id,
								}),
							);
					},
				),
		);
	}

	function findManyDocumentFolderInWhichDocumentExist() {
		return horizonClient
			.post(
				"/find-many-document-folders-in-which-document-exist",
				{
					body: {
						nodeSameRawDocumentId,
						page: pageOfListDocumentFoldersInWhichDocumentExist.value,
					},
				},
			)
			.whenInformation(
				"documentFolders.found",
				({ body }) => {
					documentFoldersInWhichDocumentExistList.value = body;
				},
			);
	}

	function findManyDocumentFolderInWhichDocumentExistDetails() {
		return horizonClient
			.post(
				"/find-many-document-folders-in-which-document-exist-details",
				{
					body: {
						nodeSameRawDocumentId,
					},
				},
			)
			.whenInformation(
				"documentFolders.foundDetails",
				({ body }) => {
					documentFoldersInWhichDocumentExistListDetails.value = body;
				},
			);
	}

	function setPageDocumentFoldersInWhichDocumentExist(page: number) {
		pageOfListDocumentFoldersInWhichDocumentExist.value = page;
	}

	function initDialog() {
		return Promise.all([
			void findDilagInformation(),
			findManyDocumentFolderInWhichDocumentExist(),
			findManyDocumentFolderInWhichDocumentExistDetails(),
		]);
	}

	function handleCreateMany() {
		const result = check();

		if (!result) {
			return;
		}

		return horizonClient
			.post(
				"/create-many-document-in-folder",
				{
					body: {
						nodeSameRawDocumentId,
						documentInFolderName: result.name,
						documentFolderIds: result.folder.map(
							(folder) => folder.value,
						),
					},
				},
			)
			.whenInformation(
				"documentInFolder.created",
				({ body: { foundError, capacityError } }) => {
					if (!foundError && !capacityError) {
						sonnerMessage(t("createManyDocumentInFolderDialog.createdMessage"));
					} else {
						sonnerWarning(
							t("createManyDocumentInFolderDialog.createdMessageWithError", {
								foundError,
								capacityError,
							}),
						);
					}
					reset();
					void initDialog();
				},
			);
	}

	watch(
		pageOfListDocumentFoldersInWhichDocumentExist,
		findManyDocumentFolderInWhichDocumentExist,
	);

	return {
		CreateManyDocumentInFolderDialogForm: Form,
		handleCreateManyDocumentInFolder: handleCreateMany,
		documentFoldersInWhichDocumentExistList,
		pageOfListDocumentFoldersInWhichDocumentExist,
		setPageDocumentFoldersInWhichDocumentExist,
		documentFoldersInWhichDocumentExistListDetails,
		documentFolderDialogInformation: dialogInformation,
		initDialog,
	};
}
