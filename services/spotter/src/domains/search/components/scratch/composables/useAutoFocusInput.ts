const timeBeforeFocus = 500;

interface UseAutoFocusInputParams {
	canFocus(): boolean;
	type?: "cursor" | "scroll";
}

interface HTMLElementRef {
	inputRef: HTMLElement;
	focus?(): void;
}

export function useAutoFocusInput(
	{
		canFocus,
		type,
	}: UseAutoFocusInputParams,
) {
	const inputToFocusRef = ref<HTMLElementRef | null>(null);

	onMounted(() => {
		if (canFocus()) {
			setTimeout(
				() => type === "scroll"
					? inputToFocusRef.value?.inputRef?.scrollTo({ behavior: "smooth" })
					: inputToFocusRef.value?.focus?.(),
				timeBeforeFocus,
			);
		}
	});

	return {
		inputToFocusRef,
	};
}
