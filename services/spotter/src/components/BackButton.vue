<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
	to?: RouteLocationRaw | { createTo(...args: unknown[]): RouteLocationRaw };
	replaceInHistory?: boolean;
}

const props = defineProps<Props>();

const router = useRouter();

function handleClick() {
	if (props.to) {
		const route = typeof props.to === "object" && "createTo" in props.to
			? props.to.createTo()
			: props.to;

		if (props.replaceInHistory) {
			void router.replace(route);
		} else {
			void router.push(route);
		}
	} else {
		router.back();
	}
}
</script>

<template>
	<DSOutlineButton
		square
		class="shrink-0"
		@click="handleClick"
	>
		<DSIcon name="arrowLeft" />
	</DSOutlineButton>
</template>
