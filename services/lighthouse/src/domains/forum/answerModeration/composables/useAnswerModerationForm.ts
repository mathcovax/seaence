import { baseWarningRules } from "@vendors/entity-rules";
import { answerPage } from "../router";

export function useAnswerModerationForm() {
	const { $pt } = answerPage.use();
	const { t } = useI18n();
	const { Form, formValue, reset, check } = useFormBuilder(
		useUnionLayout(
			[
				[
					"approve",
					useEmptyLayout(),
				],
				[
					"reject",
					useMultiFieldLayout(
						{
							title: useTextLayout($pt("warningModal.title")),
							makeUserBan: useBaseLayout(
								booleanFormField,
								{
									mandatory: true,
									props: { label: $pt("warningModal.checkboxBanUser") },
								},
							),
							reason: useCheckLayout(
								textareaFormField,
								{
									mandatory: true,
									schema: zod.string()
										.min(
											baseWarningRules.reason.min,
											{ message: t("formMessage.minLength", { value: baseWarningRules.reason.min }) },
										)
										.max(
											baseWarningRules.reason.max,
											{ message: t("formMessage.maxLength", { value: baseWarningRules.reason.max }) },
										),
									label: $pt("warningModal.reasonLabel"),
								},
							),
						},
						{
							template: multiLayoutTemplateGridCols({
								cols: 1,
								space: "large",
							}),
						},
					),
				],
			],
			{ template: unionSelectLessLayoutTemplate({}) },
		),
	);

	function switchToRejectForm() {
		formValue.value.type = "reject";
	}

	function switchToApproveForm() {
		formValue.value.type = "approve";
	}

	const formMode = computed(
		() => formValue.value.type,
	);

	return {
		switchToRejectForm,
		switchToApproveForm,
		formMode,
		resetForm: reset,
		checkForm: check,
		AnswerModerationForm: Form,
	};
}
