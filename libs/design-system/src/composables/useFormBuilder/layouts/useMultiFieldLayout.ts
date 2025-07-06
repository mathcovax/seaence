/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, h } from "vue";
import {
	type FormFieldParams,
	type GetGenericFormField,
	type FormField,
	type FormFieldInstance,
	type ExposedProperties,
} from "../formField";
import { type MultiLayoutTemplateRender } from "../templates/multiLayout";
import { simpleClone } from "@duplojs/utils";

export interface MultiLayoutOptions {
	template?: MultiLayoutTemplateRender;
}

type FormFieldsWrapper = Record<string, FormField>;

type EntriesFormFieldsWrapper<
	GenericKey extends string = string,
> = (readonly [GenericKey, FormField])[];

type FormFieldsWrapperToFormValuesWrapper<
	GenericFormFields extends FormFieldsWrapper,
> = {
	[Prop in keyof GenericFormFields]: GetGenericFormField<GenericFormFields[Prop]>["GenericValueType"]
};

type FormFieldsWrapperToFormCheckedValuesWrapper<
	GenericFormFields extends FormFieldsWrapper,
> = {
	[Prop in keyof GenericFormFields]: GetGenericFormField<GenericFormFields[Prop]>["GenericCheckedType"]
};

type EntriesFormFieldsWrapperToFormValuesWrapper<
	GenericEntriesFormFieldsWrapper extends EntriesFormFieldsWrapper,
> = {
	[Entry in GenericEntriesFormFieldsWrapper[number] as Entry[0]]: GetGenericFormField<Entry[1]>["GenericValueType"]
};

type EntriesFormFieldsWrapperToFormCheckedValuesWrapper<
	GenericEntriesFormFieldsWrapper extends EntriesFormFieldsWrapper,
> = {
	[Entry in GenericEntriesFormFieldsWrapper[number] as Entry[0]]: GetGenericFormField<Entry[1]>["GenericCheckedType"]

};

interface SpreadFormFieldInstance {
	exposed: Partial<
		Record<string, ExposedProperties>
	>;
	formFieldVNode: FormFieldInstance["getVNode"][];
}

export function useMultiFieldLayout<
	GenericFormFieldsWrapper extends FormFieldsWrapper,
>(
	formFieldsWrapper: GenericFormFieldsWrapper,
	options?: MultiLayoutOptions,
): FormField<
	FormFieldsWrapperToFormValuesWrapper<GenericFormFieldsWrapper>,
	FormFieldsWrapperToFormCheckedValuesWrapper<GenericFormFieldsWrapper>,
	any
>;
export function useMultiFieldLayout<
	GenericKey extends string,
	GenericEntriesFormFieldsWrapper extends EntriesFormFieldsWrapper<GenericKey>,
>(
	formFieldsWrapper: GenericEntriesFormFieldsWrapper,
	options?: MultiLayoutOptions,
): FormField<
	EntriesFormFieldsWrapperToFormValuesWrapper<GenericEntriesFormFieldsWrapper>,
	EntriesFormFieldsWrapperToFormCheckedValuesWrapper<GenericEntriesFormFieldsWrapper>,
	any
>;
export function useMultiFieldLayout(
	formFieldsWrapper: FormFieldsWrapper | EntriesFormFieldsWrapper,
	options?: MultiLayoutOptions,
) {
	const {
		template,
	} = options ?? {};

	const entriesFormFieldsWrapper = (
		formFieldsWrapper instanceof Array
			? formFieldsWrapper
			: Object
				.entries(formFieldsWrapper)
	);

	function multiFieldLayout(params: FormFieldParams<Record<string, unknown>>): FormFieldInstance {
		const { modelValue, key: paramsKey } = params;

		const { exposed, formFieldVNode } = entriesFormFieldsWrapper
			.reduce<SpreadFormFieldInstance>(
				(acc, [key, formField]) => {
					const { exposed, getVNode } = formField({
						modelValue: computed({
							get() {
								if (modelValue.value === undefined) {
									return simpleClone(multiFieldLayout.defaultValue);
								}
								return modelValue.value?.[key];
							},
							set(value) {
								if (modelValue.value === undefined) {
									return;
								}
								modelValue.value[key] = value;
							},
						}),
						key: `${paramsKey}.${key}`,
					});

					return {
						exposed: {
							...acc.exposed,
							[key]: exposed,
						},
						formFieldVNode: [
							...acc.formFieldVNode,
							getVNode,
						],
					};
				},
				{
					exposed: {},
					formFieldVNode: [],
				},
			);

		function check() {
			return Object
				.entries(exposed)
				.reduce<Record<string, unknown> | Error>(
					(acc, [key, { check } = {}]) => {
						if (!check) {
							return acc;
						}

						const result = check();

						if (acc instanceof Error) {
							return acc;
						}

						if (result instanceof Error) {
							return result;
						}

						return {
							...acc,
							[key]: result,
						};
					},
					{},
				) as never;
		}

		function reset() {
			Object
				.values(exposed)
				.map((exposedProperties) => exposedProperties?.reset());
		}

		return {
			exposed: {
				check,
				reset,
			},
			getVNode: () => {
				if (template) {
					return template(
						{ },
						formFieldVNode
							.map(
								(formFieldComponent) => h(formFieldComponent),
							),
					);
				} else if (useMultiFieldLayout.defaultTemplate) {
					return useMultiFieldLayout.defaultTemplate(
						{ },
						formFieldVNode
							.map(
								(formFieldComponent) => h(formFieldComponent),
							),
					);
				}

				return h(
					"div",
					{ class: "formBilderDiv formBilderLayout formBilderMultiFieldLayout formBilderDivMultiFieldLayout" },
					formFieldVNode
						.map(
							(formFieldComponent) => h(formFieldComponent),
						),
				);
			},
		};
	}

	multiFieldLayout.defaultValue = entriesFormFieldsWrapper
		.reduce(
			(acc, [key, formField]) => ({
				...acc,
				[key]: formField.defaultValue,
			}),
			{},
		) as never;

	return multiFieldLayout;
}

useMultiFieldLayout.defaultTemplate = undefined as
	| undefined
	| MultiLayoutTemplateRender;
