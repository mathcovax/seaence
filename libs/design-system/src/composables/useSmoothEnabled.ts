import { computed, reactive, ref, watch } from "vue";

const notfoundIndex = -1;
const deleteCount = 1;

export function useSmoothEnabled(smoothTime: number) {
	const enabled = ref(false);

	const activationRequestQueue = reactive<string[]>([]);

	watch(
		activationRequestQueue,
		() => {
			if (!activationRequestQueue.length && enabled.value === true) {
				setTimeout(
					() => {
						if (!activationRequestQueue.length && enabled.value === true) {
							enabled.value = false;
						}
					},
					smoothTime,
				);
			}
		},
	);

	function enable(customId?: string) {
		const id = customId ?? Math.random().toString();

		activationRequestQueue.push(id);
		setTimeout(
			() => {
				if (activationRequestQueue.includes(id)) {
					enabled.value = true;
				}
			},
			smoothTime,
		);

		return id;
	}

	function disable(id: string) {
		const index = activationRequestQueue.findIndex((idInqueue) => idInqueue === id);

		if (index !== notfoundIndex) {
			activationRequestQueue.splice(index, deleteCount);
		}
	}

	const isEnabled = computed(
		() => enabled.value,
	);

	return {
		enable,
		disable,
		isEnabled,
	};
}
