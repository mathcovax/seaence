import { userLanguageEnum, userLanguageSchema } from "@/lib/horizon/types/user";
import { userRules } from "@vendors/entity-rules";
import { useUserInformation } from "./useUserInformation";

export function useEditProfileForm() {
	const { t: $t } = useI18n();
	const { $pt } = profilePage.use();
	const { userNavigatorLanguage } = useUserInformation();

	const { Form, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textFormField,
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
			email: useBaseLayout(
				textFormField,
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
