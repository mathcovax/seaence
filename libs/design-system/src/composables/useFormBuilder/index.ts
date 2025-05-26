/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SimplifyTypeForce } from "@duplojs/utils";
import { type FunctionalComponent, h, ref, type Ref } from "vue";
import { type FormField, type GetGenericFormField } from "./formField";
import { type FormTemplateRender } from "./templates/form";

export * from "./formField";
export * from "./createFormField";
export * from "./layouts";

export type MaybeRef<
	GenericValue extends unknown,
> = GenericValue | Ref<GenericValue>;

export interface FormContext {
	slots: { default?(): any };
}

export interface FormOptions {
	template?: FormTemplateRender;
}

export function useFormBuilder<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	options?: FormOptions,
) {
	const formValue = ref<
		SimplifyTypeForce<GetGenericFormField<GenericFormField>["GenericValueType"]>
	>(formField.defaultValue);

	const formFieldComponent = formField({
		modelValue: formValue,
		key: "",
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

	const {
		template,
	} = options ?? {};

	function Form(
		porps: object,
		{ slots }: FormContext,
	) {
		const child = {
			formField: () => formFieldComponent.getVNode(),
			default: () => slots.default?.(),
		};

		if (template) {
			return template(
				{},
				child,
			);
		} else if (useFormBuilder.defaultTemplate) {
			return useFormBuilder.defaultTemplate(
				{},
				child,
			);
		}

		return h(
			"form",
			{
				class: "formBilderForm",
				onSubmit(event) {
					event.preventDefault();
				},
			},
			[
				child.formField(),
				h(
					"div",
					{
						class: "formBilderDiv formBilderDivSubmit",
					},
					[child.default()],
				),
			],
		);
	}

	return {
		Form: Form as FunctionalComponent<unknown, { submit: [] }>,
		formValue,
		check,
	};
}

useFormBuilder.defaultTemplate = undefined as
	| undefined
	| FormTemplateRender;
