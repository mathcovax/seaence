import { h, toRef } from "vue";
import { type MaybeRef } from "..";
import { type FormFieldInstance, type FormFieldParams, type FormField } from "../formField";
import { type TextLayoutTemplateRender } from "../templates/textLayout";

export interface TextLayoutOptions {
	template?: TextLayoutTemplateRender;
}

export function useTextLayout(
	content: MaybeRef<string>,
	options?: TextLayoutOptions,
): FormField<
		undefined,
		undefined,
	object
	> {
	const { template } = options ?? {};

	function textLayout(params: FormFieldParams): FormFieldInstance {
		const { key } = params;
		const contentRef = toRef(content);

		function check() {
			return undefined;
		}

		function reset() {

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
							content: contentRef.value,
							formKey: key,
						},
						null,
					);
				} else if (useTextLayout.defaultTemplate) {
					return useTextLayout.defaultTemplate(
						{
							content: contentRef.value,
							formKey: key,
						},
						null,
					);
				}

				return h(
					"p",
					{ class: "formBilderP formBilderLayout formBilderTextLayout formBilderPTextLayout" },
					[contentRef.value],
				);
			},
		};
	}

	textLayout.defaultValue = undefined;

	return textLayout;
}

useTextLayout.defaultTemplate = undefined as TextLayoutTemplateRender | undefined;
