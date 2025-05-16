import { computed, onUnmounted, ref, useId } from "vue";

const topOffset = 0;

const isScrolled = ref(false);
let whoNeedsScrollEvent: string[] = [];
function onScroll() {
	isScrolled.value = window.scrollY !== topOffset;
}

interface UseScrollParams {
	allowScrollEvent?: boolean;
}

export function useScroll(params?: UseScrollParams) {
	function scrollTo(top: number, behavior: ScrollBehavior = "smooth") {
		window.scroll({
			top,
			behavior,
		});
	}

	function scrollToTop(behavior: ScrollBehavior = "smooth") {
		scrollTo(topOffset, behavior);
	}

	if (params) {
		const id = useId();
		const { allowScrollEvent } = params;

		if (allowScrollEvent) {
			if (!whoNeedsScrollEvent.length) {
				window.addEventListener("scroll", onScroll);
			}

			whoNeedsScrollEvent.push(id);

			onUnmounted(() => {
				whoNeedsScrollEvent = whoNeedsScrollEvent.filter(
					(componentId) => componentId !== id,
				);

				if (!whoNeedsScrollEvent.length) {
					window.removeEventListener("scroll", onScroll);
				}
			});
		}
	}

	return {
		scrollTo,
		scrollToTop,
		isScrolled: computed(
			() => isScrolled.value,
		),
	};
}
