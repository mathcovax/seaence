import { baseWarningRules } from "@vendors/entity-rules";
import { postPage } from "../router";

export function usePostModerationForm() {
	const { $pt } = postPage.use();
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
									props: { label: "page.postModeration.warningModal.checkboxBanUser" },
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

	function passeToRejectForm() {
		formValue.value.type = "reject";
	}

	function passeToApproveForm() {
		formValue.value.type = "approve";
	}

	const formMode = computed(
		() => formValue.value.type,
	);

	return {
		passeToRejectForm,
		passeToApproveForm,
		formMode,
		resetForm: reset,
		checkForm: check,
		PostModerationForm: Form,
	};
}
