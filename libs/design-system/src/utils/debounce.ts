import { type ObjectKey } from "@duplojs/utils";

type DebuncedFunction = (abortController: AbortController) => void;

export function createFetchDebounce(
	time: number,
	getAbortReason: () => Error,
) {
	const debunceTime: Partial<Record<ObjectKey, number>> = {};
	const debunceTrigger: Partial<Record<ObjectKey, DebuncedFunction>> = {};

	function debounce(
		debuncedFunction: DebuncedFunction,
		identifier: ObjectKey = "default",
	) {
		const now = Date.now();
		if (
			debunceTime[identifier] === undefined
			|| now - debunceTime[identifier] >= time
		) {
			debunceTime[identifier] = now;
			debunceTrigger[identifier] = undefined;
			const abortController = new AbortController();
			debuncedFunction(abortController);

			setTimeout(
				() => {
					if (debunceTrigger[identifier]) {
						abortController.abort(getAbortReason());
						debounce(debunceTrigger[identifier], identifier);
					}
				},
				time,
			);
		} else {
			debunceTrigger[identifier] = debuncedFunction;
		}
	}

	return debounce;
}
