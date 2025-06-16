const isOpen = ref(false);

export function useRemoveDocumentFolderDialog() {
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
		setStateRemoveDocumentFolderDialog: setState,
		openRemoveDocumentFolderDialog: open,
		closeRemoveDocumentFolderDialog: close,
		toggleRemoveDocumentFolderDialog: toggle,
		isOpenRemoveDocumentFolderDialog: computed(
			() => isOpen.value,
		),
	};
}
