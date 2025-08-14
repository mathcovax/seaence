import { createExternalPromise } from "../utils/createExternalPromise";
import { h, ref, watch } from "vue";
import { type useFormBuilder } from "./useFormBuilder";
import DSFormDialog from "../components/DSFormDialog.vue";

interface ValidationDialogParams<
	GenericFormDirective extends ReturnType<typeof useFormBuilder>,
> {
	title: string;
	description?: string;
	submitLabel: string;
	cancelLabel: string;
	formDirective: GenericFormDirective;
}

export function useFormDialog<
	GenericFormDirective extends ReturnType<typeof useFormBuilder>,
>(
	params: ValidationDialogParams<GenericFormDirective>,
) {
	const opened = ref(false);
	let externalPromise: ReturnType<
		typeof createExternalPromise<
			ReturnType<GenericFormDirective["check"]>
		>
	> | null = null;

	function FormDialog() {
		return h(
			DSFormDialog,
			{
				open: opened.value,
				"onUpdate:open": (value) => {
					opened.value = value;
				},
				onSubmit: (value) => void externalPromise!.resolve(value),
				...params,
			},
		);
	}

	async function getSubmission() {
		if (!externalPromise) {
			opened.value = true;
			externalPromise = createExternalPromise();
			await new Promise<void>(
				(resolve) => {
					const watcher = watch(
						opened,
						() => {
							watcher.stop();
							resolve();
						},
					);
				},
			);

			externalPromise!.resolve(null as never);
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
		formValue: params.formDirective.formValue as GenericFormDirective["formValue"],
		FormDialog,
		getSubmission,
	};
}
