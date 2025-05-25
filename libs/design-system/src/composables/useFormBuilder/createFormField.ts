/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { h, type DefineComponent } from "vue";
import { type FormFieldInstance, type FormField, type FormFieldParams } from "./formField";

type InputComponent = DefineComponent<
	{
		modelValue?: any;
		"onUpdate:modelValue"?(value: any): void;
	},
	any,
	any
>;

interface InputComponentInstance {
	$props: {
		[key: string]: unknown;
		modelValue?: any;
		"onUpdate:modelValue"?(value: any): void;
	};
}

type GetValueType<
	GenericInputComponentInstance extends InputComponentInstance,
> = Exclude<GenericInputComponentInstance["$props"]["modelValue"], undefined>;

type GetPropFromInputComponentInstance<
	GenericInputComponentInstance extends InputComponentInstance = InputComponentInstance,
> = SimplifyObjectTopLevel<
	Omit<
		GenericInputComponentInstance["$props"],
			| "modelValue"
			| "onUpdate:modelValue"
	>
>;

export function createFormField<
	GenericInputComponent extends InputComponent,
	GenericValueType extends GetValueType<InstanceType<GenericInputComponent>>,
>(
	input: GenericInputComponent,
	defaultValue: GenericValueType,
): FormField<
		GenericValueType,
		GenericValueType,
		GetPropFromInputComponentInstance<InstanceType<GenericInputComponent>>
	> {
	function formField(params: FormFieldParams): FormFieldInstance {
		const { modelValue, props, key } = params;
		function check() {
			return modelValue.value;
		}

		return {
			exposed: {
				check,
			},
			getVNode: () => h(
				input,
				{
					...props?.value,
					modelValue: modelValue.value,
					"onUpdate:modelValue": (value: any) => {
						modelValue.value = value;
					},
					key,
				},
			),
		};
	}

	formField.defaultValue = defaultValue;

	return formField;
}
