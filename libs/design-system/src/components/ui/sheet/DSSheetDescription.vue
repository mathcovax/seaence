<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { DialogDescription, type DialogDescriptionProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<DialogDescription
		:class="cn('text-sm text-muted-foreground', props.class)"
		v-bind="delegatedProps"
	>
		<slot />
	</DialogDescription>
</template>
