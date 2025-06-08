import { reportingRules } from "@vendors/entity-rules";

export function useReportingWrongTranslateForm() {
	const { $pt } = documentPage.use();
	const { t } = useI18n();

	const { Form, check, reset } = useFormBuilder(
		useMultiFieldLayout({
			reportingDetails: useCheckLayout(
				textareaFormField,
				{
					mandatory: true,
					label: $pt("reportingWrongTranslate.form.textareaLabel"),
					schema: zod.string()
						.min(
							reportingRules.details.minLength,
							{ message: t("formMessage.minLength", { value: reportingRules.details.minLength }) },
						)
						.max(
							reportingRules.details.maxLength,
							{ message: t("formMessage.maxLength", { value: reportingRules.details.maxLength }) },
						),
					props: { maxLength: reportingRules.details.maxLength },
				},
			),
		}),
	);

	return {
		ReportingWrongTranslateForm: Form,
		checkReportingWrongTranslateForm: check,
		resetReportingWrongTranslateForm: reset,
	};
}
