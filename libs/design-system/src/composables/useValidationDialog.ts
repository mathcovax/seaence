import { createExternalPromise } from "../utils/createExternalPromise";
import DSValidationDialog from "../components/DSValidationDialog.vue";
import { h, ref, watch } from "vue";

interface ValidationDialogParams {
	title: string;
	description?: string;
	acceptLabel: string;
	rejectLabel: string;
	destructive?: boolean;
}

export function useValidationDialog(params: ValidationDialogParams) {
	const opened = ref(false);
	let externalPromise: ReturnType<typeof createExternalPromise<boolean>> | null = null;

	function ValidationDialog() {
		return h(
			DSValidationDialog,
			{
				open: opened.value,
				"onUpdate:open": (value) => {
					opened.value = value;
				},
				onAccept: () => void externalPromise!.resolve(true),
				onReject: () => void externalPromise!.resolve(false),
				...params,
			},
		);
	}

	async function getValidation() {
		if (!externalPromise) {
			opened.value = true;
			externalPromise = createExternalPromise();
			await new Promise(
				(resolve) => void watch(opened, resolve),
			);

			externalPromise!.resolve(false);
			externalPromise.promise = externalPromise.promise
				.then(
					(result) => {
						externalPromise = null;
						return result;
					},
				);
		}
		return externalPromise.promise;
	}

	return {
		ValidationDialog,
		getValidation,
	};
}
