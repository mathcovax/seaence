import { documentInFolderRules } from "@vendors/entity-rules";

const minLength = documentInFolderRules.name.minLength;
const maxLength = documentInFolderRules.name.maxLength;

interface UseRenameFormDialogParams {
	title: string;
	label: string;
}

export function useRenameFormDialog(params: UseRenameFormDialogParams) {
	const { t } = useI18n();

	const formDirective = useFormBuilder(
		useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: params.label,
				schema: zod.string()
					.min(minLength, t("formMessage.minLength", { value: minLength }))
					.max(maxLength, t("formMessage.maxLength", { value: maxLength })),
				props: {
					maxLength: maxLength,
				},
			},
		),
		{ template: formTemplate({ reverse: false }) },
	);

	return useFormDialog({
		...params,
		cancelLabel: t("cta.cancel"),
		submitLabel: t("cta.rename"),
		formDirective,
	});
}
