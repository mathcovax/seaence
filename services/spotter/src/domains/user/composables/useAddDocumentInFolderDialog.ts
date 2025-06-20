import { type MultiComboboxItem } from "@vendors/design-system/components/form/MultiComboboxTemplate.vue";
import { documentInFolderRules } from "@vendors/entity-rules";

const minSelectFolder = 1;
const maxSelectFolder = 5;

const folderItemSchema = zod.object({
	label: zod.string(),
	value: zod.string(),
});

export function useAddDocumentInFolderDialog(
	nodeSameRawDocumentId: string,
) {
	const { t: $t } = useI18n();

	const itemsOfInputFolder = ref<MultiComboboxItem[]>([]);

	const { Form, check } = useFormBuilder(
		useMultiFieldLayout({
			name: useBaseLayout(
				textformField,
				{
					mandatory: true,
					label: $t("addDocumentInFolderDialog.form.label.name"),
					schema: zod.string()
						.min(
							documentInFolderRules.name.minLength,
							$t("formMessage.minLength", { value: documentInFolderRules.name.minLength }),
						)
						.max(
							documentInFolderRules.name.maxLength,
							$t("formMessage.maxLength", { value: documentInFolderRules.name.maxLength }),
						),
				},
			),
			folder: useCheckLayout(
				multiComboBoxFormField,
				{
					mandatory: true,
					label: $t("addDocumentInFolderDialog.form.label.folder"),
					schema: folderItemSchema
						.array()
						.min(minSelectFolder, $t("formMessage.minLength", { value: minSelectFolder }))
						.max(maxSelectFolder, $t("formMessage.minLength", { value: maxSelectFolder })),
					props: computed(() => ({
						items: itemsOfInputFolder.value,
						placeholder: $t("addDocumentInFolderDialog.form.placeholder.folder"),
						emptyLabel: $t("addDocumentInFolderDialog.form.emptyLabel.folder"),
						"onUpdate:searchTerm": (value) => findManyDocumentFolderByName(value),
					})),
				},
			),
		}),
	);

	function handleAdd() {
		const result = check();

		if (!result) {
			return;
		}

		return horizonClient
			.post(
				"/add-document-in-folder",
				{
					body: {
						nodeSameRawDocumentId,
						documentInFolderName: result.name,
						documentFolderId: "",
					},
				},
			);
	}

	function findManyDocumentFolderByName(name?: string) {
		return horizonClient
			.post(
				"/find-many-document-folders",
				{
					body: {
						page: 1,
						partialDocumentFolderName: name ?? "",
					},
				},
			)
			.whenInformation(
				"documentFolders.found",
				({ body }) => {
					itemsOfInputFolder.value = body.list
						.map(
							(item) => ({
								label: item.name,
								value: item.id,
							}),
						);
					console.log(itemsOfInputFolder.value);
				},
			);
	}

	void findManyDocumentFolderByName();

	return {
		AddDocumentInFolderDialogForm: Form,
		handleAddDocumentInFolder: handleAdd,
	};
}
