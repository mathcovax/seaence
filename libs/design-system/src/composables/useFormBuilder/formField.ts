/* eslint-disable @typescript-eslint/no-explicit-any */

import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { type VNode, type Ref, type HTMLAttributes } from "vue";
import { type ZodError } from "zod";

export interface BaseProps {
	class?: HTMLAttributes["class"];
	style?: HTMLAttributes["style"];
	disabled?: boolean;
}

export interface ExposedProperties<
	GenericCheckedType extends unknown = unknown,
> {
	check(): ZodError | GenericCheckedType;
	reset(): void;
}

export interface FormFieldParams<
	GenericValueType extends unknown = unknown,
	GenericProps extends object = any,
> {
	modelValue: Ref<GenericValueType>;
	key: string;
	props?: Ref<GenericProps>;
}

export interface FormFieldInstance<
	GenericCheckedType extends unknown = any,
> {
	exposed: ExposedProperties<GenericCheckedType>;
	getVNode(): VNode | null | boolean;
}

export interface FormField<
	GenericValueType extends unknown = any,
	GenericCheckedType extends unknown = any,
	GenericProps extends object = any,
> {
	(
		params: SimplifyObjectTopLevel<
			FormFieldParams<
				GenericValueType,
				GenericProps
			>
		>
	): FormFieldInstance<
		GenericCheckedType
	>;
	defaultValue: GenericValueType;
}

export type GetGenericFormField<
	GenericFormField extends FormField,
> = GenericFormField extends FormField<
	infer InferedValueType,
	infer InferedCheckedType,
	infer InferedProps
>
	? {
		GenericValueType: InferedValueType;
		GenericCheckedType: InferedCheckedType;
		GenericProps: InferedProps;
	}
	: never;
