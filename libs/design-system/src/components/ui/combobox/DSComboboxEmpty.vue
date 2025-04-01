<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { type ComboboxEmptyProps, ComboboxEmpty } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<ComboboxEmpty
		v-bind="delegatedProps"
		:class="cn('py-6 text-center text-sm', props.class)"
	>
		<slot />
	</ComboboxEmpty>
</template>
