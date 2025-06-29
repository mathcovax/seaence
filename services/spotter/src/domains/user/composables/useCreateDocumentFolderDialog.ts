export function useCreateDocumentFolderDialog() {
	const isOpen = ref(false);

	function open() {
		isOpen.value = true;
	}

	function close() {
		isOpen.value = false;
	}

	function setState(state: boolean) {
		isOpen.value = state;
	}

	return {
		setStateCreateDocumentFolderDialog: setState,
		openCreateDocumentFolderDialog: open,
		closeCreateDocumentFolderDialog: close,
		isOpenCreateDocumentFolderDialog: computed(
			() => isOpen.value,
		),
	};
}
