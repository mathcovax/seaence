import { useCheckLayout, useFormBuilder } from "@vendors/design-system/composables/useFormBuilder";
import { useBaseLayout } from "@vendors/design-system/composables/useFormBuilder/layouts/useBaseLayout";
import { useMultiFieldLayout } from "@vendors/design-system/composables/useFormBuilder/layouts/useMultiFieldLayout";
import { userRules } from "@vendors/entity-rules";

export function useEditProfileForm() {
	const { $pt } = profilePage.use();

	const { From, formValue, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textformField,
				{
					obligate: true,
					label: $pt("personalInfo.label.username"),
					schema: zod.string()
						.min(userRules.username.minLength)
						.max(userRules.username.maxLength),
				},
			),
			email: useBaseLayout(
				textformField,
				{
					obligate: true,
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
		EditProfileForm: From,
		editProfileformValue: formValue,
		editProfileformCheck: check,
	};
}
