/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, h } from "vue";
import { type GetGenericFormField, type FormField, type FormFieldInstance, type FormFieldParams } from "../formField";
import { ZodError } from "zod";
import { type RepeatLayoutTemplateRender } from "../templates/repeatLayout";
import { simpleClone } from "@duplojs/utils";

export interface UnionLayoutOptions {
	template?: RepeatLayoutTemplateRender;
	maxItems?: number;
}

export function useRepeatLayout<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	options?: UnionLayoutOptions,
): FormField<
		{ value: GetGenericFormField<GenericFormField>["GenericValueType"] }[],
		GetGenericFormField<GenericFormField>["GenericCheckedType"][],
		any
	> {
	const {
		template,
		maxItems = Infinity,
	} = options ?? {};

	function repeatLayout(params: FormFieldParams<{ value: unknown }[]>): FormFieldInstance {
		const { modelValue, key } = params;

		const formFieldItems = computed(
			() => modelValue.value.map(
				(value, index) => {
					let last = value;

					return formField({
						modelValue: computed({
							get() {
								return modelValue.value?.[index]?.value ?? last.value;
							},
							set(value) {
								if (!modelValue.value?.[index]) {
									return;
								}
								last = { value };
								modelValue.value[index].value = value;
							},
						}),
						key: `${key}.${index}`,
					});
				},
			),
		);

		function check() {
			const result = formFieldItems.value
				.reduce<unknown[] | ZodError>(
					(acc, { exposed }) => {
						const value = exposed.check();

						if (acc instanceof Error) {
							return acc;
						}

						if (value instanceof ZodError) {
							return value;
						}

						acc.push(value);

						return acc;
					},
					[],
				);

			return result;
		}

		function reset() {
			formFieldItems.value.map(
				({ exposed }) => void exposed.reset(),
			);
		}

		function addItem() {
			modelValue.value = [...modelValue.value, { value: simpleClone(formField.defaultValue) }];
		}

		function removeItem(index: number) {
			modelValue.value = modelValue.value.filter(
				(_item, indexItem) => indexItem !== index,
			);
		}

		return {
			exposed: {
				check,
				reset,
			},
			getVNode: () => {
				if (template) {
					return template(
						{
							maxItems,
							onAddItem: addItem,
							onRemoveItem: removeItem,
							items: formFieldItems.value.map(
								({ getVNode }) => getVNode,
							),
						},
						null,
					);
				} else if (useRepeatLayout.defaultTemplate) {
					return useRepeatLayout.defaultTemplate(
						{
							maxItems,
							onAddItem: addItem,
							onRemoveItem: removeItem,
							items: formFieldItems.value.map(
								({ getVNode }) => getVNode,
							),
						},
						null,
					);
				}

				return h(
					"div",
					{ class: "formBilderDiv formBilderLayout formBilderRepeatLayout formBilderDivRepeatLayout" },
					[
						formFieldItems.value.length < maxItems
							? h(
								"button",
								{
									class: "formBilderButton formBilderLayout formBilderRepeatLayout formBilderButtonAddRepeatLayout",
									type: "button",
									onClick: () => void addItem(),
								},
								"+",
							)
							: undefined,
						formFieldItems.value.map(
							({ getVNode }, index) => h(
								"div",
								{ class: "formBilderButton formBilderLayout formBilderRepeatLayout formBilderDivRepeatLayout" },
								[
									h(getVNode),
									h(
										"button",
										{
											class: [
												"formBilderButton formBilderLayout",
												"formBilderRepeatLayout formBilderButtonRemoveRepeatLayout",
											],
											type: "button",
											onClick: () => void removeItem(index),
										},
										"x",
									),
								],
							),
						),
					],
				);
			},
		};
	}

	repeatLayout.defaultValue = [{ value: formField.defaultValue }] as never;

	return repeatLayout;
}

useRepeatLayout.defaultTemplate = undefined as
	| undefined
	| RepeatLayoutTemplateRender;
