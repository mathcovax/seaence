export function useCreateDocumentFolderDialog() {
	const isOpen = ref(false);

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
		setStateCreateDocumentFolderDialog: setState,
		openCreateDocumentFolderDialog: open,
		closeCreateDocumentFolderDialog: close,
		toggleCreateDocumentFolderDialog: toggle,
		isOpenCreateDocumentFolderDialog: computed(
			() => isOpen.value,
		),
	};
}
