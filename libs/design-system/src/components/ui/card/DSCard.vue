<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { cn } from "../../../lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
	title?: string;
	description?: string;
	link?: RouteLocationRaw;
}>();

const slot = defineSlots<{
	header?: never;
	title?: never;
	description?: never;
	default: never;
	footer?: never;
}>();

const titleComponent = computed(() => {
	if (!props.title) {
		return null;
	}
	return props.link ? RouterLink : "span";
});

const titleProps = computed(() => {
	if (!props.link) {
		return {};
	}
	return {
		to: props.link,
		class: "text-blue-seaence hover:underline",
	};
});

const hasHeader = computed(() => slot.header || props.title || props.description);
const hasFooter = computed(() => slot.footer);
</script>

<template>
	<div
		:class="cn(
			'flex flex-col gap-6 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden',
			props.class,
			{
				'p-6': !hasHeader && !hasFooter,
			}
		)"
	>
		<DSCardHeader v-if="slot.header || title || description">
			<slot name="header">
				<DSCardTitle v-if="title">
					<component
						:is="titleComponent"
						v-bind="titleProps"
					>
						{{ title }}
					</component>
				</DSCardTitle>

				<DSCardDescription v-if="description">
					<slot name="description">
						{{ description }}
					</slot>
				</DSCardDescription>
			</slot>
		</DSCardHeader>

		<DSCardContent
			:class="{
				'pb-6': hasHeader && !hasFooter,
				'px-6': hasHeader || hasFooter,
				'pt-6': !hasHeader && hasFooter,
			}"
		>
			<slot />
		</DSCardContent>

		<DSCardFooter v-if="slot.footer">
			<slot name="footer" />
		</DSCardFooter>
	</div>
</template>
