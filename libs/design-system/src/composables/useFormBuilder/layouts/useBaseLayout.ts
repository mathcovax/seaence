
import { h, type MaybeRef, ref, toRef } from "vue";
import {
	type FormFieldParams,
	type GetGenericFormField,
	type FormField,
	type FormFieldInstance,
	type BaseProps,
} from "../formField";
import { type AnyFunction, type IsEqual } from "@duplojs/utils";
import { type BaseLayoutTemplateRender } from "../templates/baseLayout";

interface BaseOptions {
	mandatory: true;
}

export interface BaseLayoutOptions<
	GenericFormField extends FormField = FormField,
	GenericTemplate extends AnyFunction = AnyFunction,
> extends BaseOptions {
	props?: MaybeRef<GetGenericFormField<GenericFormField>["GenericProps"] & BaseProps>;
	defaultValue?: GetGenericFormField<GenericFormField>["GenericValueType"];
	label?: string;
	disabled?: MaybeRef<boolean>;
	template?: GenericTemplate;
}

export type MaybeCheckedType<
	GenericCheckedType extends unknown,
	GenericBaseLayoutOptions extends BaseLayoutOptions,
> = IsEqual<GenericBaseLayoutOptions["disabled"], unknown> extends true
	? GenericCheckedType
	: GenericCheckedType | undefined;

export type ChouseDefaultValue<
	GenericValueType extends unknown,
	GenericBaseLayoutOptions extends BaseLayoutOptions,
> = IsEqual<GenericBaseLayoutOptions["defaultValue"], unknown> extends true
	? GenericValueType
	: GenericBaseLayoutOptions["defaultValue"];

export function useBaseLayout<
	GenericFormField extends FormField,
	GenericBaseLayoutOptions extends BaseLayoutOptions<
		GenericFormField,
		BaseLayoutTemplateRender
	> = { mandatory: true },
>(
	formField: GenericFormField,
	options?: GenericBaseLayoutOptions,
): FormField<
		ChouseDefaultValue<
			GetGenericFormField<GenericFormField>["GenericValueType"],
			GenericBaseLayoutOptions
		>,
		MaybeCheckedType<
			GetGenericFormField<GenericFormField>["GenericCheckedType"],
			GenericBaseLayoutOptions
		>,
		GetGenericFormField<GenericFormField>["GenericProps"]
	> {
	const {
		defaultValue,
		props: propsFromOptions,
		label,
		disabled: optionalDisabled,
		template,
	} = options ?? {};

	function baseLayout(params: FormFieldParams): FormFieldInstance {
		const { modelValue, props: propsFromParams, key } = params;

		const formFieldComponent = formField({
			modelValue: modelValue,
			props: propsFromOptions
				? toRef(propsFromOptions)
				: propsFromParams,
			key,
		});

		const disable = optionalDisabled
			? toRef(optionalDisabled)
			: ref(false);

		function check() {
			if (disable.value) {
				return undefined;
			}
			return formFieldComponent.exposed.check();
		}

		function reset() {
			formFieldComponent.exposed.reset();
		}

		return {
			exposed: {
				check,
				reset,
			},
			getVNode: () => {
				if (disable.value) {
					return null;
				} else if (template) {
					return template(
						{
							label,
							formKey: key,
						},
						formFieldComponent.getVNode(),
					);
				} else if (useBaseLayout.defaultTemplate) {
					return useBaseLayout.defaultTemplate(
						{
							label,
							formKey: key,
						},
						formFieldComponent.getVNode(),
					);
				}

				return h(
					"div",
					{ class: "formBilderDiv formBilderLayout formBilderBaseLayout formBilderDivBaseLayout" },
					[
						label && h(
							"label",
							{ class: "formBilderLabel formBilderLayout formBilderBaseLayout formBilderLabelBaseLayout" },
							[label],
						),
						formFieldComponent.getVNode(),
					],
				);
			},
		};
	}

	baseLayout.defaultValue = defaultValue ?? formField.defaultValue;

	return baseLayout;
}

useBaseLayout.defaultTemplate = undefined as
	| undefined
	| BaseLayoutTemplateRender;
