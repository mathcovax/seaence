import { documentFolderRules } from "@vendors/entity-rules";

const minLength = documentFolderRules.name.minLength;
const maxLength = documentFolderRules.name.maxLength;

export function useCreateDocumentFolderFormDialog(
	whenCreated: () => void = () => void undefined,
) {
	const { t } = useI18n();

	const formDirective = useFormBuilder(
		useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: t("createDocumentFolderDialog.label"),
				schema: zod.string()
					.min(minLength, t("formMessage.minLength", { value: minLength }))
					.max(maxLength, t("formMessage.maxLength", { value: maxLength })),
			},
		),
	);

	const {
		FormDialog: CreateFormDialog,
		getSubmission,
	} = useFormDialog({
		formDirective,
		title: t("createDocumentFolderDialog.title"),
		cancelLabel: t("cta.cancel"),
		submitLabel: t("cta.create"),
	});

	async function createDocumentFolder() {
		const result = await getSubmission();
		if (!result) {
			return;
		}

		void horizonClient
			.post(
				"/create-document-folder",
				{
					body: {
						documentFolderName: result,
					},
				},
			)
			.whenInformation(
				"documentFolder.created",
				whenCreated,
			);
	}

	return {
		CreateFormDialog,
		createDocumentFolder,
	};
}
