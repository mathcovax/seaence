<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { ChevronDown } from "lucide-vue-next";
import {
	AccordionHeader,
	AccordionTrigger,
	type AccordionTriggerProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<AccordionHeader class="flex">
		<AccordionTrigger
			v-bind="delegatedProps"
			:class="cn(
				'flex flex-1 items-center justify-between py-4 text-start font-medium transition-all cursor-pointer hover:underline [&[data-state=open]>svg]:rotate-180',
				props.class,
			)"
		>
			<slot />

			<slot name="icon">
				<ChevronDown class="size-4 shrink-0 transition-transform duration-200" />
			</slot>
		</AccordionTrigger>
	</AccordionHeader>
</template>
