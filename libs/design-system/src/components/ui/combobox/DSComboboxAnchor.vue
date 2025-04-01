<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { type ComboboxAnchorProps, ComboboxAnchor, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
	<ComboboxAnchor
		v-bind="forwarded"
		:class="cn('w-full mx-auto', props.class)"
	>
		<slot />
	</ComboboxAnchor>
</template>
