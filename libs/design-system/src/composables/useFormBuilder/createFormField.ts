/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IsEqual, type SimplifyObjectTopLevel } from "@duplojs/utils";
import { h, ref, type DefineComponent } from "vue";
import { type FormFieldInstance, type FormField, type FormFieldParams, type ExposedProperties } from "./formField";

type InputComponent = DefineComponent<any, any, any, any, any, any, any, any, any, object, any>;

interface InputComponentInstance {
	$props: {
		[key: string]: unknown;
		modelValue?: any;
		"onUpdate:modelValue"?(value: any): void;
	};
	check?(): any;
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

export interface FormFieldOptions<
	GenericInputComponent extends InputComponent,
	GenericValueType extends unknown,
> {
	defaultValue: GenericValueType;
	props: GetPropFromInputComponentInstance<InstanceType<GenericInputComponent>>;
}

export function createFormField<
	GenericInputComponent extends InputComponent,
	GenericValueType extends GetValueType<InstanceType<GenericInputComponent>>,
>(
	input: GenericInputComponent,
	options: FormFieldOptions<
		GenericInputComponent,
		GenericValueType
	>,
): FormField<
		GenericValueType,
		IsEqual<InstanceType<GenericInputComponent>["check"], unknown> extends true
			? GenericValueType
			: ReturnType<InstanceType<GenericInputComponent>["check"]>,
		GetPropFromInputComponentInstance<InstanceType<GenericInputComponent>>
	> {
	const {
		defaultValue,
		props: propsFromOptions,
	} = options;

	function formField(params: FormFieldParams): FormFieldInstance {
		const { modelValue, props, key } = params;
		const componentRef = ref<
			ExposedProperties | null
		>(null);

		function check() {
			if (componentRef.value?.check) {
				return componentRef.value.check();
			}

			return modelValue.value;
		}

		function reset() {
			if (componentRef.value?.reset) {
				componentRef.value.reset();
			}
		}

		return {
			exposed: {
				check,
				reset,
			},
			getVNode: () => h(
				input,
				{
					...propsFromOptions,
					...props?.value,
					modelValue: modelValue.value,
					"onUpdate:modelValue": (value: any) => {
						modelValue.value = value;
					},
					key,
					id: key,
					ref: componentRef,
				},
			),
		};
	}

	formField.defaultValue = defaultValue;

	return formField;
}
