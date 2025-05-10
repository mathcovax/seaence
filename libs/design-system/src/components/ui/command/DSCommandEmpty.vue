<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "reka-ui";
import { cn } from "../../../lib/utils";
import { computed, type HTMLAttributes } from "vue";
import { useCommand } from ".";

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const { filterState } = useCommand();
const noResult = 0;
const isRender = computed(() => !!filterState.search && filterState.filtered.count === noResult);
</script>

<template>
	<Primitive
		v-if="isRender"
		data-slot="command-empty"
		v-bind="delegatedProps"
		:class="cn('py-6 text-center text-sm', props.class)"
	>
		<slot />
	</Primitive>
</template>
