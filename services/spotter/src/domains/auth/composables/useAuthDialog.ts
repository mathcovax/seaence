const isOpen = ref(false);

export function useAuthDialog() {
	function open() {
		isOpen.value = true;
	}

	function close() {
		isOpen.value = false;
	}

	function toggle() {
		isOpen.value = !isOpen.value;
	}

	function setState(state: boolean) {
		isOpen.value = state;
	}

	return {
		setState,
		open,
		close,
		toggle,
		isOpen: computed(
			() => isOpen.value,
		),
	};
}
