export function useScroll() {
	const topOffset = 0;

	function scrollTo(top: number, behavior: ScrollBehavior = "smooth") {
		window.scroll({
			top,
			behavior,
		});
	}

	function scrollToTop(behavior: ScrollBehavior = "smooth") {
		scrollTo(topOffset, behavior);
	}

	return {
		scrollTo,
		scrollToTop,
	};
}
