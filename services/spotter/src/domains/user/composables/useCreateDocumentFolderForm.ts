import { zod } from "@vendors/clean";
import { documentFolderRules } from "@vendors/entity-rules";

export function useCreateDocumentFolder() {
	const { t: $t } = useI18n();
	const { $pt } = documentFolderPage.use();

	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			name: useBaseLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.name"),
					schema: zod.string()
						.min(
							documentFolderRules.name.minLength,
							$t("formMessage.minLength", { value: documentFolderRules.name.minLength }),
						)
						.max(
							documentFolderRules.name.maxLength,
							$t("formMessage.maxLength", { value: documentFolderRules.name.maxLength }),
						),
				},
			),
		}),
	);

	return {
		CreateDocumentFolderForm: Form,
		createDocumentFolderValue: formValue,
		createDocumentFolderCheck: check,
	};
}
