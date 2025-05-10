import { computed, ref, type Ref, watch, type WatchOptions } from "vue";

export function useRefHasChange(
	refToObserve: Ref,
	options?: WatchOptions,
) {
	const hasChange = ref(false);

	watch(
		refToObserve,
		() => {
			hasChange.value = true;
		},
		options,
	);

	function reset() {
		hasChange.value = false;
	}

	return {
		hasChange: computed(
			() => hasChange.value,
		),
		reset,
	};
}
