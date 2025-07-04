<script setup lang="ts">
import { nextTick, ref, watch, type HTMLAttributes, withDefaults, defineProps, onMounted } from "vue";

interface Props {
	visible?: boolean;
	class?: HTMLAttributes["class"];
	imediateEnter?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{ visible: true },
);
const elementRef = ref<HTMLElement | null>(null);

const defaultHeight = 0;
function computeHeight(element: HTMLElement) {
	return [...element.childNodes]
		.reduce(
			(acc, child) => {
				if (child instanceof HTMLElement) {
					return acc + child.offsetHeight;
				}

				return acc;
			},
			defaultHeight,
		);
}

function onEnter(element: Element) {
	if (!(element instanceof HTMLElement)) {
		return;
	}

	element.style.height = "0.0px";
	void nextTick(() => {
		element.style.height = `${computeHeight(element)}px`;
	});
}

function onLeave(element: Element) {
	if (!(element instanceof HTMLElement)) {
		return;
	}

	element.style.height = `${computeHeight(element)}px`;
	void element.offsetHeight;
	element.style.height = "0.0px";
}

const resizeObserver = new MutationObserver(() => {
	const element = elementRef.value;
	if (!element || element.style.height === "0.0px") {
		return;
	}

	element.style.height = `${computeHeight(element)}px`;
});

watch(
	elementRef,
	() => {
		if (!elementRef.value) {
			return;
		}

		resizeObserver.observe(elementRef.value, {
			subtree: true,
			childList: true,
		});
	},
);

onMounted(() => {
	if (props.imediateEnter && elementRef.value) {
		onEnter(elementRef.value);
	}
});
</script>

<template>
	<Transition
		@enter="onEnter"
		@leave="onLeave"
	>
		<div
			v-show="visible"
			ref="elementRef"
			class="overflow-hidden transition-all"
			:class="props.class"
		>
			<slot />
		</div>
	</Transition>
</template>
