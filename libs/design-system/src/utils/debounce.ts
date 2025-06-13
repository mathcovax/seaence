import { type ObjectKey } from "@duplojs/utils";

export function createFetchDebounce(time: number) {
	const debunceTime: Partial<Record<ObjectKey, number>> = {};
	const debunceTrigger: Partial<Record<ObjectKey, boolean>> = {};

	function debounce(
		debuncedFunction: (abortController: AbortController) => void,
		identifier: ObjectKey = "default",
	) {
		const now = Date.now();
		if (
			debunceTime[identifier] === undefined
			|| now - debunceTime[identifier] >= time
		) {
			debunceTime[identifier] = now;
			debunceTrigger[identifier] = false;
			const abortController = new AbortController();
			debuncedFunction(abortController);

			setTimeout(
				() => {
					if (debunceTrigger[identifier]) {
						abortController.abort();
						debounce(debuncedFunction, identifier);
					}
				},
				time,
			);
		} else {
			debunceTrigger[identifier] = true;
		}
	}

	return debounce;
}
