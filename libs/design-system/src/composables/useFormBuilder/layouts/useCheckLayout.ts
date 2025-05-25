
import { effect, h, ref, toRef, watch } from "vue";
import { type FormFieldParams, type GetGenericFormField, type FormField, type FormFieldInstance } from "../formField";
import { type ZodType } from "zod";
import { type MaybeCheckedType, useBaseLayout, type BaseLayoutOptions, type ChouseDefaultValue } from "./useBaseLayout";

export interface CheckLayoutOptions<
	GenericFormField extends FormField = FormField,
> extends BaseLayoutOptions<GenericFormField> {
	schema: ZodType;
}

export function useCheckLayout<
	GenericFormField extends FormField,
	GenericCheckLayoutOptions extends CheckLayoutOptions<GenericFormField>,
>(
	formField: GenericFormField,
	options: GenericCheckLayoutOptions,
): FormField<
		ChouseDefaultValue<
			GetGenericFormField<GenericFormField>["GenericValueType"],
			GenericCheckLayoutOptions
		>,
		MaybeCheckedType<
			GenericCheckLayoutOptions["schema"]["_output"],
			GenericCheckLayoutOptions
		>,
		GetGenericFormField<GenericFormField>["GenericProps"]
	> {
	const {
		schema,
		defaultValue,
		props: propsFromOptions,
		label,
		disabled: optionalDisabled,
	} = options;

	function checkLayout(params: FormFieldParams): FormFieldInstance {
		const { modelValue, props: propsFromParams, key } = params;
		const errorMessage = ref("");

		const formFieldComponent = useBaseLayout(
			formField,
			{
				obligate: true,
				label,
				defaultValue,
				props: propsFromOptions,
			},
		)({
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

			const result = schema.safeParse(formFieldComponent.exposed.check());

			if (result.success) {
				errorMessage.value = "";
				return result.data;
			} else {
				errorMessage.value = result.error.issues.shift()?.message ?? "";
				return result.error;
			}
		}

		effect(() => {
			if (errorMessage.value) {
				check();
			}
		});

		watch(
			disable,
			() => {
				errorMessage.value = "";
			},
		);

		return {
			exposed: {
				check,
			},
			getVNode: () => !disable.value && h(
				"div",
				{ class: "formBilderDiv formBilderLayout formBilderCheckLayout formBilderDivCheckLayout" },
				[
					formFieldComponent.getVNode(),
					h(
						"small",
						{ class: "formBilderSmall formBilderLayout formBilderCheckLayout formBilderSmallCheckLayout" },
						[errorMessage.value],
					),
				],
			),
		};
	}

	checkLayout.defaultValue = defaultValue ?? formField.defaultValue;

	return checkLayout;
}
