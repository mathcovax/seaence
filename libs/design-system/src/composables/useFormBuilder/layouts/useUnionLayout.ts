/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	type GetGenericFormField,
	type FormField,
	type FormFieldInstance,
	type FormFieldParams,
	type ExposedProperties,
} from "../formField";
import { computed, h, watch } from "vue";
import { type UnionLayoutTemplateRender } from "../templates/unionLayout";
import { simpleClone } from "@duplojs/utils";

export interface UnionLayoutOptions {
	template?: UnionLayoutTemplateRender;
}

type FormFieldUnionValue<
	GenericType extends string = string,
> = [
	type: GenericType,
	formField: FormField,
];

type FormFieldsUnionValueToFormValueWrapper<
	GenericFormFieldUnionValue extends FormFieldUnionValue,
> = GenericFormFieldUnionValue extends infer InferedFormFieldUnionValue extends FormFieldUnionValue
	? {
		type: InferedFormFieldUnionValue[0];
		value: GetGenericFormField<InferedFormFieldUnionValue[1]>["GenericValueType"];
	}
	: never;

type FormFieldsUnionValueToFormCheckedValueWrapper<
	GenericFormFieldUnionValue extends FormFieldUnionValue,
> = GenericFormFieldUnionValue extends infer InferedFormFieldUnionValue extends FormFieldUnionValue
	? {
		type: InferedFormFieldUnionValue[0];
		value: GetGenericFormField<InferedFormFieldUnionValue[1]>["GenericCheckedType"];
	}
	: never;

interface FormFieldsUnionValue {
	type: string;
	value: unknown;
}

type UnionFormFieldInstanceWrapper = Record<
	string,
	{
		exposed: ExposedProperties;
		getVNode: FormFieldInstance["getVNode"];
	}
>;

export function useUnionLayout<
	GenericFormFieldUnionValueType extends string,
	GenericFormFieldUnionValue extends FormFieldUnionValue<
		GenericFormFieldUnionValueType
	>,
>(
	formFieldUnionValues: GenericFormFieldUnionValue[],
	options?: UnionLayoutOptions,
): FormField<
		FormFieldsUnionValueToFormValueWrapper<
			GenericFormFieldUnionValue
		>,
		FormFieldsUnionValueToFormCheckedValueWrapper<
			GenericFormFieldUnionValue
		>,
		any
	> {
	const {
		template,
	} = options ?? {};

	function unionLayout(params: FormFieldParams<FormFieldsUnionValue>): FormFieldInstance {
		const { modelValue, key: paramsKey } = params;

		const unionFormFieldInstanceWrapper = formFieldUnionValues
			.reduce<UnionFormFieldInstanceWrapper>(
				(acc, [type, formField]) => ({
					...acc,
					[type]: formField({
						modelValue: computed({
							get() {
								return modelValue.value.value;
							},
							set(value) {
								modelValue.value.value = value;
							},
						}),
						key: `${paramsKey}.${type}`,
					}),
				}),
				{},
			);

		const typesUnionFormField = Object.keys(unionFormFieldInstanceWrapper);

		function reset() {
			unionFormFieldInstanceWrapper[modelValue.value.type].exposed.reset();
		}

		function check() {
			const result = unionFormFieldInstanceWrapper[modelValue.value.type].exposed.check();
			return result instanceof Error
				? result
				: {
					type: modelValue.value.type,
					value: result,
				};
		}

		function changeType(newType: string) {
			const [_type, findedFormField] = formFieldUnionValues.find(([type]) => newType === type) ?? [];
			if (!findedFormField) {
				return;
			}

			modelValue.value = {
				type: newType,
				value: simpleClone(findedFormField.defaultValue),
			};
		}

		watch(
			() => modelValue.value.type,
			(type) => {
				changeType(type);
			},
			{ flush: "pre" },
		);

		return {
			exposed: {
				reset,
				check,
			},
			getVNode: () => {
				if (template) {
					return template(
						{
							types: typesUnionFormField,
							modelValue: modelValue.value.type,
							"onUpdate:modelValue": changeType,
						},
						h(unionFormFieldInstanceWrapper[modelValue.value.type].getVNode),
					);
				} else if (useUnionLayout.defaultTemplate) {
					return useUnionLayout.defaultTemplate(
						{
							types: typesUnionFormField,
							modelValue: modelValue.value.type,
							"onUpdate:modelValue": changeType,
						},
						h(unionFormFieldInstanceWrapper[modelValue.value.type].getVNode),
					);
				}

				return h(
					"div",
					{ class: "formBilderDiv formBilderLayout formBilderUnionLayout formBilderDivUnionLayout" },
					[
						h(
							"select",
							{
								value: modelValue.value.type,
								onChange: (event: Event) => void changeType((event.target as HTMLSelectElement).value),
							},
							typesUnionFormField.map(
								(value) => h("option", [value]),
							),
						),
						h(unionFormFieldInstanceWrapper[modelValue.value.type].getVNode),
					],
				);
			},
		};
	}

	const [[defaultType, defaultFormFields]] = formFieldUnionValues;
	unionLayout.defaultValue = {
		type: defaultType,
		value: defaultFormFields.defaultValue,
	} as never;

	return unionLayout;
}

useUnionLayout.defaultTemplate = undefined as
	| undefined
	| UnionLayoutTemplateRender;
