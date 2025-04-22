import type { ZodType } from "zod";
import { getProvidedCheckFieldsValue } from "../provides/checkFields";

export function useHintMessage<
	GenericZodSchema extends ZodType,
>(
	zodSchema: GenericZodSchema,
	currentValue: Ref<unknown>,
) {
	const hintMessage = ref<string | null>();

	function check() {
		const { success, data, error } = zodSchema.safeParse(currentValue.value);
		if (!success) {
			hintMessage.value = error.issues.shift()?.message ?? null;
			return false;
		}

		currentValue.value = data;
		hintMessage.value = null;

		return true;
	}

	const checkFields = getProvidedCheckFieldsValue();
	onMounted(() => {
		checkFields!.value.push(check);
	});

	onUnmounted(() => {
		checkFields!.value = checkFields!.value.filter(
			(checkField) => checkField !== check,
		);
	});

	return {
		hintMessage,
	};
}
