<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { type ComboboxTriggerProps, ComboboxTrigger, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
	<ComboboxTrigger
		v-bind="forwarded"
		:class="cn('', props.class)"
		tabindex="0"
	>
		<slot />
	</ComboboxTrigger>
</template>
