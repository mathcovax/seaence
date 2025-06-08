import { userRules } from "@vendors/entity-rules";

export function useEditProfileForm() {
	const { t: $t } = useI18n();
	const { $pt } = profilePage.use();

	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textformField,
				{
					mandatory: true,
					label: $pt("personalInfo.label.username"),
					schema: zod.string()
						.min(
							userRules.username.minLength,
							$t("formMessage.minLength", { value: userRules.username.minLength }),
						)
						.max(
							userRules.username.maxLength,
							$t("formMessage.maxLength", { value: userRules.username.maxLength }),
						),
				},
			),
			email: useBaseLayout(
				textformField,
				{
					mandatory: true,
					label: $pt("personalInfo.label.email"),
					props: {
						disabled: true,
						class: "",
					},
				},
			),
		}),
	);

	return {
		EditProfileForm: Form,
		editProfileformValue: formValue,
		editProfileformCheck: check,
	};
}
