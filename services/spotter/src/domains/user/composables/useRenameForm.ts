const minLength = 3;
const maxLength = 350;

export function useRenameForm(labelKey: string) {
	const { t } = useI18n();

	const { Form, formValue, check, reset } = useFormBuilder(
		useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: t(labelKey),
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

	return {
		RenameForm: Form,
		renameFormValue: formValue,
		renameFormCheck: check,
		renameFormReset: reset,
	};
}
