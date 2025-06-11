<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../lib/utils";
import { Primitive } from "reka-ui";
import { buttonIconSizeMapper, buttonVariants, type DSButtonProps } from ".";
import DSIcon from "../icon/DSIcon.vue";

const props = withDefaults(defineProps<DSButtonProps>(), {
	as: "button",
	type: "button",
});

const className = computed(
	() => cn(
		buttonVariants({
			variant: props.variant,
			size: props.size,
		}),
		props.class,
	),
);
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="{
			[className]: true,
			'aspect-square overflow-hidden': square,
			'!rounded-full': rounded,
		}"
		:type
	>
		<DSIcon
			v-if="icon"
			:name="icon"
			:size="size ? buttonIconSizeMapper[size] : buttonIconSizeMapper.default"
		/>

		<slot />
	</Primitive>
</template>
