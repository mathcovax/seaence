<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<TabsTrigger
		v-bind="forwardedProps"
		:class="cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-seaence data-[state=active]:text-white data-[state=active]:shadow-sm',
			props.class,
		)"
	>
		<span class="truncate">
			<slot />
		</span>
	</TabsTrigger>
</template>
