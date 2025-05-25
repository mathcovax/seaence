/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SimplifyTypeForce } from "@duplojs/utils";
import { type FunctionalComponent, h, ref, type Ref } from "vue";
import { type FormField, type GetGenericFormField } from "./formField";

export * from "./formField";
export * from "./createFormField";
export * from "./layouts";

export type MaybeRef<
	GenericValue extends unknown,
> = GenericValue | Ref<GenericValue>;

export interface FormContext {
	slots: { default?(): any };
}

export function useFormBuilder<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
) {
	const formValue = ref<
		SimplifyTypeForce<GetGenericFormField<GenericFormField>["GenericValueType"]>
	>(formField.defaultValue);

	const formFieldComponent = formField({
		modelValue: formValue,
		key: ".",
	});

	function check():
		| SimplifyTypeForce<
			GetGenericFormField<GenericFormField>["GenericCheckedType"]
		>
		| null {
		const result = formFieldComponent.exposed.check();

		if (result instanceof Error) {
			return null;
		}

		return result;
	}

	function From(
		porps: object,
		{ slots }: FormContext,
	) {
		return h(
			"form",
			{
				class: "formBilderForm",
				onSubmit(event) {
					event.preventDefault();
				},
			},
			[
				formFieldComponent.getVNode(),
				h(
					"div",
					{
						class: "formBilderDiv formBilderDivSubmit",
					},
					[slots.default?.()],
				),
			],
		);
	}

	return {
		From: From as FunctionalComponent<unknown, { submit: [] }>,
		formValue,
		check,
	};
}
