import { userRules } from "@vendors/entity-rules";

export function useRegisterForm() {
	const { t } = useI18n();

	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textformField,
				{
					obligate: true,
					label: t("authDialog.registerForm.usernameLabel"),
					schema: zod.string()
						.min(
							userRules.username.minLength,
							t("formMessage.minLength", { value: userRules.username.minLength }),
						)
						.max(
							userRules.username.maxLength,
							t("formMessage.maxLength", { value: userRules.username.maxLength }),
						),
				},
			),
			generalConditionsOfUse: useCheckLayout(
				booleanFormField,
				{
					obligate: true,
					schema: zod.custom<true>(
						(value) => value === true,
						t("authDialog.registerForm.requireCGU"),
					),
					props: { label: t("authDialog.registerForm.CGULabel") },
				},
			),
		}),
		{
			template: formTemplate({ align: "center" }),
		},
	);

	return {
		RegisterForm: Form,
		registerFormValue: formValue,
		checkRegisterForm: check,
	};
}
