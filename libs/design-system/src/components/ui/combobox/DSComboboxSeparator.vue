<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { type ComboboxSeparatorProps, ComboboxSeparator } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<ComboboxSeparator
		v-bind="delegatedProps"
		:class="cn('-mx-1 h-px bg-border', props.class)"
	>
		<slot />
	</ComboboxSeparator>
</template>
