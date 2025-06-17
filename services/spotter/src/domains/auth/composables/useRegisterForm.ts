import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { userLanguageEnum, userLanguageSchema } from "@/lib/horizon/types/user";
import { userRules } from "@vendors/entity-rules";

export function useRegisterForm() {
	const { t } = useI18n();
	const { userNavigatorLanguage } = useUserInformation();

	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textFormField,
				{
					mandatory: true,
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
			language: useCheckLayout(
				selectStringFormField,
				{
					mandatory: true,
					defaultValue: userNavigatorLanguage.value,
					schema: userLanguageSchema,
					props: {
						items: userLanguageEnum.toTuple(),
						placeholder: "",
					},
				},
			),
			generalConditionsOfUse: useCheckLayout(
				booleanFormField,
				{
					mandatory: true,
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
