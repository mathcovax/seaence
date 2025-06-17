import { type FormFieldInstance, type FormField } from "../formField";

export function useEmptyLayout(): FormField<
	undefined,
	undefined,
	object
> {
	function textLayout(): FormFieldInstance {
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
			getVNode: () => null,
		};
	}

	textLayout.defaultValue = undefined;

	return textLayout;
}
