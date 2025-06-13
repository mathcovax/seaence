<script setup lang="ts">
import {
	type PopoverRootEmits,
	type PopoverRootProps,
	PopoverRoot,
	useForwardPropsEmits,
} from "reka-ui";
import DSPopoverTrigger from "./DSPopoverTrigger.vue";
import DSPopoverContent from "./DSPopoverContent.vue";

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
	default: never;
	content: never;
}>();
</script>

<template>
	<PopoverRoot
		data-slot="popover"
		v-bind="forwarded"
	>
		<DSPopoverTrigger as-child>
			<slot name="default" />
		</DSPopoverTrigger>

		<DSPopoverContent>
			<slot name="content" />
		</DSPopoverContent>
	</PopoverRoot>
</template>
